import { useState, useEffect } from "react";
import { useRole } from "../Role.js";
import Nav from "../Nav.jsx";
import "../styles/Posts.css";

const Post = () => {

    const { role, username } = useRole();

    const [posts, setPosts] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [showAll, setShowAll] = useState(true);
    
    function myPosts(){
        if (role === "public") {
            window.alert("Login to see your posts");
            return;
        }
        setShowAll(false);
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

    useEffect(() => {
        const content = async () =>{
            const data = await getPosts();
            setPosts(data);
            //console.log(data);
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
            <button onClick={() => setShowAll(true)}>View all posts</button>
            <div className="posts-container">
            {showAll && posts.map((posts, index) => {
                return(
                       <div key={index} style={{
                                                width: "900px",
                                                height: "auto",
                                                border: "1px solid black",
                                                padding: "10px",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                boxSizing: "border-box" // Ensures padding is included in width/height
                                                }
                                            }> 
                            <h2 style={{margin: "5px 0"}}>{posts.title}</h2>
                            <h5 style={{margin: "5px 0"}}>{posts.author}</h5>
                            <h5 style={{margin: "5px 0"}}>{posts.date}</h5>
                            <p style={{marginTop: "30px"}}>{posts.content}</p>
                        </div>
                )
            })}
            </div>

            {!showAll && posts.map((posts, index) => {
                if (posts.author === username){
                    return(
                        <div key={index} style={{width: "900px", height: "300px", border: "1px solid black", color: "green"}}> 
                             <h4>{posts.title}</h4>
                             <h5>{posts.author}</h5>
                             <h5>{posts.date}</h5>
                             <p>{posts.content}</p>
                         </div>
                 )
                }
                else return null;
            })}
        </>
    )
}

export default Post;