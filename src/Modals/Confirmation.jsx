import "../styles/Modals.css"

const Confirmation = ({closeModal, handleConfirm, title, message}) => {

    function confirm(){
        handleConfirm();
    }

    return(
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
                        <button onClick={confirm}>OK</button>
                        <button onClick={() => {closeModal(false)} } id="cancelbtn">Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Confirmation