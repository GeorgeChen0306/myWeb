import { useEffect, useState } from "react";
import "../styles/Modals.css"
import Confirmation from "./Confirmation.jsx";

const UpdatePost = ({closeEdit, title, oldTitle, oldContent}) => {
    const MAX_TITLE_LENGTH = 50;
    const MAX_TEXT_LENGTH = 500;

    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const [newPostTitleLength, setNewPostTitleLength] = useState(0);
    const [newPostTextLength, setNewPostTextLength] = useState(0);

    const [openConfirmModal, setOpenConfirmModal] = useState(false);

    useEffect(() => {
        setNewTitle(oldTitle);
        setNewContent(oldContent);
        setNewPostTitleLength(oldTitle.length);
        setNewPostTextLength(oldContent.length);
        setIsLoading(false);
    },[])

    function confirmUpdate(){
        setOpenConfirmModal(true);
    }

    function closeNotification(){
        setOpenConfirmModal(false);
    }

    function update(){
        closeEdit(newTitle, newContent);
    }

    function close(){
        closeEdit(newTitle, newContent, true)
    }

    function updateNewTitle(e){
        var title = e.target.value;

        if (title.length <= MAX_TITLE_LENGTH){
            setNewTitle(e.target.value);
            setNewPostTitleLength(e.target.value.length);
        }
    }

    function updateNewContent(e){
        var updatedText = e.target.value;

        if (updatedText.length <= MAX_TEXT_LENGTH){
            setNewContent(e.target.value);
            setNewPostTextLength(e.target.value.length);
        }
    }

    if (isLoading) return null;

    return (
        <>
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="title">
                        <h2>{title}</h2>
                    </div>
                    
                    <label>New Title</label>
                    <input 
                          value={newTitle}
                          onChange={updateNewTitle}
                    />
                    <input
                           className="t-length"
                           value={newPostTitleLength + `/${MAX_TITLE_LENGTH}`}
                           readOnly
                    />
                    
                    <label>New Content</label>
                    <textarea 
                          value={newContent}
                          onChange={updateNewContent}
                    />
                    <input 
                           className="c-length"
                           value={newPostTextLength + `/${MAX_TEXT_LENGTH}`}
                           readOnly
                    />
                    <div className="footer">
                        <button onClick={confirmUpdate}>Update post</button>
                        <button className="cancel-btn" onClick={close}>Cancel</button>
                    </div>
                </div>
            </div>
            {openConfirmModal && <Confirmation closeModal={closeNotification} handleConfirm={update} title={"Update Post"} message={"Are you sure you want to update the post?"}/>}
        </>
    )
}

export default UpdatePost