import { useState } from "react";
import "../styles/Modals.css"

const CreatePost = ({closeModal, title, setPostInfo}) => {
    const [postText, setPostText] = useState("");
    const [postTitle, setPostTitle] = useState("");
    
    function close(){
        setPostInfo(postTitle, postText);
        closeModal();
    }
    
    return(
        <>
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="title">
                        <h2>{title}</h2>
                    </div>
                    <label htmlFor="title">Provide the title of the post</label>
                    <input 
                          id="title"
                          type="text"
                          value={postTitle}
                          onChange={(e) => setPostTitle(e.target.value)}
                    />
                    <br />
                    <label htmlFor="text">Provide the content of the post</label>
                    <input
                          id="content"
                          type="text"
                          value={postText}
                          onChange={(e) => setPostText(e.target.value)}
                    />
                    <button onClick={close} style={{marginTop:"50px"}}>Create the post!</button>
                </div>
            </div>
        </>
    )
}

export default CreatePost;