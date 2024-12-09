import { useEffect, useState } from "react";
import "../styles/Modals.css"

const UpdatePost = ({closeEdit, title, oldTitle, oldContent}) => {
    
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setNewTitle(oldTitle);
        setNewContent(oldContent);
        setIsLoading(false);
    },[])
    
    function update(){
        closeEdit(newTitle, newContent);
    }

    function close(){
        closeEdit(newTitle, newContent, true)
    }

    if (isLoading) return null;

    return (
        <>
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="title">
                        <h2>{title}</h2>
                    </div>
                    <label htmlFor="title">New Title: </label>
                    <input 
                          id="title"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <label htmlFor="content">New Content: </label>
                    <input 
                          id="content"
                          value={newContent}
                          onChange={(e) => setNewContent(e.target.value)}
                    />
                    <div className="footer">
                        <button onClick={update} style={{marginTop:"50px"}}>Update post</button>
                        <button onClick={close}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdatePost