import { useState, useEffect } from "react";
import { useRole } from "../Role.js";
import Nav from "../Nav.jsx";
import "../styles/Posts.css";
import CreatePost from "../Modals/CreatePost.jsx";
import UpdatePost from "../Modals/EditPost.jsx";

const Post = () => {

    const { role, username } = useRole();

    const [posts, setPosts] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [showAll, setShowAll] = useState(true);

    const [openNewPostModal, setOpenNewPostModal] = useState(false);
    const [editPost, setEditPost] = useState(false);

    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");

    const [oldContent, setOldContent] = useState("");
    const [updatedContent, setUpdatedContent] = useState("");
    const [postId, setPostId] = useState(0);
    
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

    async function getPosts(){
        const response = await fetch("/api/posts", {
            method: "GET",
            headers: {
                    "Content-Type": "application/json"
            }
        })
        if (!response.ok){
            console.log("Error retrieving posts")
        }

        const postsData = await response.json();
        return postsData;
    }
    
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
                    content: updatedContent
                })
            }
        )
        if (!response.ok){
            console.error("Error adding the post");
        }

        const result = await response.json();
        return result;
    }

    // This state runs every time a new post is submitted
    useEffect(() => {
        if (postTitle.trim() !== "" && postContent.trim() !== ""){
            const submitPost = async () => {
                const result = await addPost(postTitle, postContent);
                setPostTitle("");
                setPostContent("");
                window.alert(result.message);
            };
            submitPost();
        }
    },[postTitle, postContent])


    // This state runs every 
    useEffect(() => {
        if (updatedContent.trim() !== ""){
            const changePost = async () => {
                console.log(postId);
                const result = await updatePost(postId, updatedContent);
                setPostId(null);
                setUpdatedContent("");
                window.alert(result.message);
                //window.location.reload();
            };
            changePost();
        }
    },[updatedContent])

    // Convert time to mm/dd/yyyy
    function convertToDate(time){
        const date = new Date(time);
        return `${date.getMonth()+ 1}/${date.getDate()}/${date.getFullYear()}`;
    }

    // CHANGE THE NAME!!!
    // Close the create new post modal
    function closeModal(){
        setOpenNewPostModal(false);
    }

    // Close the edit post modal
    function closeEdit(newContent){
        setUpdatedContent(newContent);
        console.log(updatedContent);
        setEditPost(false);
    }

    async function setPostInfo(title, content){
        setPostTitle(title);
        setPostContent(content);
    }

    function myPosts(){
        if (role === "public") {
            window.alert("Login to see your posts");
            return;
        }
        setShowAll(false);
    }

    function createPost(){
        if (role === "public"){
            window.alert("Login to create a post");
            return;
        }
        setOpenNewPostModal(true);
    }

    function updatingPost(event){
        const result = posts.find(post => post.pid === Number(event.target.id));
        setOldContent(result.content);
        console.log(result);
        console.log(result.pid);
        console.log("Before ", postId)
        setPostId(result.pid);
        console.log("After ", postId)
        setEditPost(true);
    }

    useEffect(() => {
        const content = async () =>{
            const data = await getPosts();
            setPosts(data);
            setIsFetching(false);
        }
        content()
    },[])

    if (isFetching){
        return (<h1>Fetching posts...</h1>)
    }

    return(
        <>
            <Nav />
            <h1>Posts</h1>
            <button onClick={myPosts}>View my posts</button>
            <button onClick={createPost}>Create a post</button>
            <br />
            <button onClick={() => setShowAll(true)}>View all posts</button>
            
            {showAll && posts.map((posts, index) => {
                return(
                    <div key={index} className="posts-container">
                       <div className="posts-content"> 
                            <h2>{posts.title}</h2>
                            <h5>By: {posts.author}</h5>
                            <h5>{convertToDate(posts.date)}</h5>
                            <p>{posts.content}</p>
                        </div>
                    </div>
                )
            })}
            
            {!showAll && posts.map((posts, index) => {
                if (posts.author === username){
                    return(
                        <div key={index} className="posts-container">
                            <div className="posts-content"> 
                                <h2>{posts.title}</h2>
                                <h5>By: {posts.author}</h5>
                                <h5>{convertToDate(posts.date)}</h5>
                                <p>{posts.content}</p>
                                <button id={posts.pid} onClick={updatingPost}>Edit</button>
                            </div>
                         </div>
                    )
                }
                else return null;
            })}
            {openNewPostModal && <CreatePost closeModal={closeModal} title="Create a post" setPostInfo={setPostInfo} />}
            {editPost && <UpdatePost closeEdit={closeEdit} title="Edit Post" oldContent={oldContent}/>}
        </>
    )
}

export default Post;