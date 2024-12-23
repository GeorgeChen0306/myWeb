import { useState, useEffect } from "react";
import { useRole } from "../context/Role.js";
import Nav from "../components/Nav.jsx";
import "../styles/posts.css";
import CreatePost from "../Modals/CreatePost.jsx";
import UpdatePost from "../Modals/EditPost.jsx";
import Confirmation from "../Modals/Confirmation.jsx";
import Notification from "../Modals/Notification.jsx";

const Post = () => {
    
    const { role, username, logout } = useRole();

    const [posts, setPosts] = useState(null); // posts data
    const [isFetching, setIsFetching] = useState(true); // fetching posts
    const [showAll, setShowAll] = useState(true); // show all posts

    const [openNewPostModal, setOpenNewPostModal] = useState(false);
    const [editPost, setEditPost] = useState(false);

    // State to manage create a new post
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");

    // State to manage post update
    const [oldContent, setOldContent] = useState("");
    const [oldTitle, setOldTitle] = useState("");
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedContent, setUpdatedContent] = useState("");
    const [postId, setPostId] = useState(0);

    // Post view status 
    const [myPostsBtnDisabled, setMyPostsBtnDisabled] = useState(false);
    const [allPostsBtnDisabled, setAllPostsBtnDisabled] = useState(true);

    // State to manage delete post
    const [openConfirmDelete, setOpenConfirmDeleteModal] = useState(false);
    const [deletePostId, setDeletePostId] = useState(null);

    const [openNotificationModal, setOpenNotificationModal] = useState(false);
    const [notificationTitle, setNotificationTitle] = useState("");
    const [notificationMsg, setNotificationMsg] = useState("");

    // Check how many posts the user have
    let userPostsCount = 0;
    if (!showAll){
        userPostsCount = posts.filter(post => post.author === username).length;
    }
    
/*START------------------------------- API REQUESTS TO THE SERVER--------------------------------- */    
    
    // API call to get all posts
    async function getPosts(){
        const response = await fetch("/api/posts", {
            method: "GET",
            headers: {
                    "Content-Type": "application/json"
            }
        })
        if (!response.ok){
            console.error("Error retrieving posts")
        }

        const postsData = await response.json();
        return postsData;
    }

    // API call to add a new post
    async function addPost(){
        const response = await fetch("/api/createPost", 
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("LoginToken")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: postTitle,
                    content: postContent  
                })
            }
        )
        if (!response.ok){
            console.error("Error adding the post");
        }

        const result = await response.json();
        return result;
    }

    // API call to update a post
    async function updatePost(){
        const response = await fetch("/api/updatePost", 
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("LoginToken")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    postId: postId,
                    title: updatedTitle,
                    content: updatedContent,
                    user: username
                })
            }
        )
        if (!response.ok){
            console.error("Error adding the post");
        }

        const result = await response.json();
        return result;
    }

    // API call to delete a post
    async function deletePost(pid){
        const response = await fetch("/api/deletePost", 
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("LoginToken")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    postId: pid,
                    user: username
                })
            }
        )
        if (!response.ok){
            console.error("Error adding the post");
        }

        const result = await response.json();
        return result;
    }

    async function checkToken(token){
        try{
            const response = await fetch("/api/verify", {
                method: "POST",
                headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                }
            })

            if (!response.ok){
                console.error("Error verifying token");
                return ({isAuthorized: false})
            }

            const data = await response.json();
            return data;
        }
        catch (error){
            console.error(error)
            return ({isAuthorized: false})
        }
    }
/*END --------------------------------- API REQUESTS TO THE SERVER--------------------------------------------- */

/*START---------------------------------------USE EFFECT------------------------------------------ */
    // This state runs every time a new post is submitted
    useEffect(() => {
        if (postTitle.trim() !== "" && postContent.trim() !== ""){
            const submitPost = async () => {
                const result = await addPost(postTitle, postContent);
                setPostTitle("");
                setPostContent("");
                
                setNotificationTitle("New Post")
                setNotificationMsg(result.message);
                setOpenNotificationModal(true);
            };
            submitPost();
        }
    },[postTitle, postContent])

    // This state runs every 
    useEffect(() => {
        if (updatedContent.trim() !== ""){
            const changePost = async () => {
                const result = await updatePost(postId, updatedTitle, updatedContent);
                setPostId(null);
                setUpdatedContent("");
                
                setNotificationTitle("Post Status")
                setNotificationMsg(result.message);
                setOpenNotificationModal(true);
            };
            changePost();
        }
    },[updatedTitle, updatedContent])

    
    // Runs when the page load
    useEffect(() => {
        const content = async () =>{
            const data = await getPosts();
            setPosts(data);
            setIsFetching(false);
            
            // Extract url query 
            const url = new URL(window.location);
            const params = new URLSearchParams(window.location.search);
            
            // Check for view key in url query
            if (params.has("view")){
                var value = params.get("view");
                if (value.toLowerCase() === "myposts"){
                    viewMyPosts()
                }
                else if (value.toLowerCase() === "allposts"){
                    viewAllPosts();
                }
                else {
                    url.searchParams.set("view", "allposts")
                    window.history.pushState({}, "", url);
                    viewAllPosts();
                }
            }
            else {
                // Push the view key to the url query
                url.searchParams.set("view", "allposts")
                window.history.pushState({}, "", url);
            }
        }
        content()
    },[])
/*END-------------------------------------------------USE EFFECT------------------------------------------ */
    
    function closeNotification(){
        setOpenNotificationModal(false);
        window.location.reload();
    }

    // Delete the post
    async function removePost(event){
        setOpenConfirmDeleteModal(false);
        const result = await deletePost(deletePostId);
        setNotificationTitle("Post Status");
        setNotificationMsg(result.message);
        // if (result.success) window.location.reload();
        setOpenNotificationModal(true);
    }

    // Convert time to mm/dd/yyyy
    function convertToDate(time, updated){
        const date = new Date(time);
        const HMS = date.toLocaleTimeString();
        if (!updated) return `Posted on: ${date.getMonth()+ 1}/${date.getDate()}/${date.getFullYear()} at ${HMS}`;
        else return `Updated on: ${date.getMonth()+ 1}/${date.getDate()}/${date.getFullYear()} at ${HMS}`
    }

    // Close the create new post modal
    function closeCreateNewPost(){
        setOpenNewPostModal(false);
    }

    function closeDeletePostModal(){
        setOpenConfirmDeleteModal(false);
    }

    function confirmDeletePost(event){
        const pid = event.target.getAttribute("data-pid");
        setDeletePostId(pid);
        setOpenConfirmDeleteModal(true);
    }

    // Close the edit post modal
    function closeEdit(newTitle, newContent, cancel=false){
        setEditPost(false);
        if (cancel) return;
        setUpdatedTitle(newTitle);
        setUpdatedContent(newContent);
    }

    // Set the new post title and content
    async function setNewPostInfo(title, content, cancel=false){
        if (cancel) return;
        setPostTitle(title);
        setPostContent(content);
    }

    // View posts made by the user
    async function viewMyPosts(){
        const token = localStorage.getItem("LoginToken");
        if (!token || (role === "public")) {
            window.alert("Login to see your posts");
            paramQuery("allposts");
            return;
        }
        const result = await checkToken(token);

        if (!result.isAuthorized){
            window.alert("Login to see your posts");
            logout();
            paramQuery("allposts");
            return;
        }

        paramQuery("myposts")
        setMyPostsBtnDisabled(true);
        setAllPostsBtnDisabled(false);
        setShowAll(false);
    }

    // View all posts
    function viewAllPosts(){
        paramQuery("allposts");
        setAllPostsBtnDisabled(true);
        setMyPostsBtnDisabled(false);
        setShowAll(true);
    }

    async function createPost(){
        if (role === "public"){
            window.alert("Login to create a post");
            return;
        }

        const token = localStorage.getItem("LoginToken");
        if (!token || (role === "public")) {
            window.alert("Login to create a post");
            return;
        }
        const result = await checkToken(token);

        if (!result.isAuthorized){
            window.alert("Login to create a post");
            logout();
            return;
        }
        setOpenNewPostModal(true);
    }

    function updatingPost(event){
        const result = posts.find(post => post.pid === Number(event.target.getAttribute("data-pid")));
        setOldTitle(result.title);
        setOldContent(result.content);
        setPostId(result.pid);
        setEditPost(true);
    }

    // URL query parameters
    function paramQuery(view){
        const url = new URL(window.location);
        url.searchParams.set("view", view);
        window.history.pushState({}, "",  url);
    }

    // Fetching posts data
    if (isFetching){
        return (<h1>Fetching posts...</h1>)
    }

    return(
        <>
            <Nav />
            <div className="background">
            <h1>Posts</h1>
            <div className="posts-header">
                <button id="myPosts" 
                        onClick={viewMyPosts} 
                        disabled={myPostsBtnDisabled}>View my posts</button>
                <button id="allPosts" 
                        disabled={allPostsBtnDisabled}
                        onClick={viewAllPosts}>View all posts</button>
                <button onClick={createPost}>Create a post</button>
            </div>
            {showAll && posts.map((posts, index) => {
                return(
                    <div key={index} className="posts-container">
                       <div className="posts-content"> 
                            <h2>{posts.title}</h2>
                            <h5>By: {posts.author}</h5>
                            <h5>{convertToDate(posts.date, posts.updated)}</h5>
                            <p>{posts.content}</p>
                        </div>
                    </div>
                )
            })}

            {showAll && (posts.length === 0) && (<h3>Seems like there are no posts</h3>)}

            {
            !showAll && posts.map((posts, index) => {
                if (posts.author === username){
                    return(
                        <div key={index} className="posts-container">
                            <div className="posts-content"> 
                                <h2>{posts.title}</h2>
                                <h5>By: {posts.author}</h5>
                                <h5>{convertToDate(posts.date, posts.updated)}</h5>
                                <p>{posts.content}</p>
                                <div className="choice-btn">
                                    <button data-pid={posts.pid} onClick={updatingPost}>Edit</button>
                                    <button className="delete-btn" data-pid={posts.pid} onClick={confirmDeletePost}>Delete</button>
                                </div>
                            </div>
                         </div>
                    )
                }
                else return null;
            })}
            </div>

            {!showAll && (userPostsCount === 0) && (<h3>Seems like you have no post.</h3>)}

            {openNewPostModal && <CreatePost closeCreateNewPost={closeCreateNewPost} title="Create a post" setNewPostInfo={setNewPostInfo} />}
            {editPost && <UpdatePost closeEdit={closeEdit} title="Edit Post" oldTitle={oldTitle} oldContent={oldContent}/>}
            {openConfirmDelete && <Confirmation closeModal={closeDeletePostModal} handleConfirm={removePost} title="Delete this post?" message="Are you sure you want to delete this post? This cannot be undone"/>}
            {openNotificationModal && <Notification closeModal={closeNotification} title={notificationTitle} message={notificationMsg}/>}

        </>
    )
}

export default Post;