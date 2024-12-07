import { useEffect, useState } from "react";
import "../styles/Modals.css"

const UpdatePost = ({closeEdit, title, oldContent}) => {
    
    const [newContent, setNewContent] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setNewContent(oldContent);
        setIsLoading(false);
    },[])
    
    function update(){
        closeEdit(newContent);
    }

    if (isLoading) return null;

    return (
        <>
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="title">
                        <h2>{title}</h2>
                    </div>
                    <input 
                          id="title"
                          value={newContent}
                          onChange={(e) => setNewContent(e.target.value)}
                    />
                    <button onClick={update} style={{marginTop:"50px"}}>Update post</button>
                </div>
            </div>
        </>
    )
}

export default UpdatePost