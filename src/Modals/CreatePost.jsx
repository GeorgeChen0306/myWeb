import { useState } from "react";
import Confirmation from "./Confirmation.jsx";
import "../styles/Modals.css"

const CreatePost = ({closeCreateNewPost, title, setNewPostInfo}) => {
    const MAX_TITLE_LENGTH = 50;
    const MAX_TEXT_LENGTH = 300;
    
    const [postText, setPostText] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [postTitleLength, setPostTitleLength] = useState(0);
    const [postTextLength, setPostTextLength] = useState(0);

    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    
    // Pass the new post title and text and close the create post modal
    function close(){
        setNewPostInfo(postTitle, postText);
        closeCreateNewPost();
    }
    
    // Close the create post modal
    function cancel(){
        setOpenConfirmModal(false);
        setNewPostInfo(postTitle, postText, true);
        closeCreateNewPost();
    }

    // Prevent user from exceeding title length 50 chars
    function checkPostTitleLength(e){
        const title = e.target.value;

        if (title.length <= MAX_TITLE_LENGTH){
            setPostTitle(e.target.value);
            setPostTitleLength(e.target.value.length);    
        }
    }

    // Prevent user from exceeding text length 200 chars
    function checkPostTextLength(e){
        const text = e.target.value;

        if (text.length <= MAX_TEXT_LENGTH){
            setPostText(e.target.value);
            setPostTextLength(e.target.value.length);    
        }
    }

    function closeModal(){
        setOpenConfirmModal(false);
    }

    function handleCreatePost(){
        setOpenConfirmModal(true)
    }

    return(
        <>
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="title">
                        <h2>{title}</h2>
                    </div>
                    <div className="postForm">
                        <input 
                            id="title"
                            type="text"
                            placeholder="Title"
                            value={postTitle}
                            onChange={checkPostTitleLength}
                        />
                        <input id="title_length"
                            value={`${postTitleLength}/${MAX_TITLE_LENGTH}`}
                            style={{border: "none", outline: "none", pointerEvents: "none", userSelect: "none"}}
                            readOnly
                        />
                        <br />
                        <input
                            id="content"
                            type="text"
                            placeholder="Content"
                            value={postText}
                            onChange={checkPostTextLength}
                        />
                        <input id="text_length"
                            value={`${postTextLength}/${MAX_TEXT_LENGTH}`}
                            style={{border: "none", outline: "none", pointerEvents: "none", userSelect: "none"}}
                            readOnly
                        />
                    </div>
                    <div className="footer">
                        <button onClick={handleCreatePost} style={{marginTop:"50px"}}>Create the post!</button>
                        <button onClick={cancel}>Cancel</button>
                    </div>
                </div>
            </div>
            {openConfirmModal && <Confirmation closeModal={closeModal} handleConfirm={close} title={"Create Post"} message="Are you sure you want to post this?"/>}
        </>
    )
}

export default CreatePost;