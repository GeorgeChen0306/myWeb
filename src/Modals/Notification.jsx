import "../styles/Modals.css"

const Notification = ({closeModal, title, message}) => {
    
    function closeNotification(){
        closeModal();
    }

    return (
        <>
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="title">
                        <h2>{title}</h2>
                    </div>
                    <div className="body">
                        <p>{message}</p>
                    </div>
                    <div className="footer">
                        <button onClick={closeNotification}>Ok</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notification