import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useRole } from "../context/Role.js";
import Nav from "../components/Nav.jsx"
import "../styles/login.css"
import Notification from "../Modals/Notification.jsx";

const Login = () =>{

    const navigate = useNavigate();

    const { updateRole, updateUsername, updateFirstName, updateLastName } = useRole();
    
    const [noAccount, setNoAccount] = useState(true);
    const [loginUserName, setLoginUserName] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [newAccountUserName, setNewAccountUserName] = useState("");
    const [newAccountPassword, setNewAccountPassword] = useState("");
    const [newAccountFirstName, setNewAccountFirstName] = useState("");
    const [newAccountLastName, setNewAccountLastName] = useState("");

    const [errMsg, setErrMsg] = useState("");
    const [signUpErrMsg ,setSignUpErrMsg] = useState("");

    const [openNotification, setOpenNotification] = useState(false);
    const [notificationTitle, setNotificationTitle] = useState("");
    const [notificationMsg, setNotitificationMsg] = useState("");

    async function checkLogin(username, password){
        try{
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: username,
                    password: password
                })
            })
            if (!response.ok){
                console.error("Error!!!");
            }
    
            const result = await response.json();
            return result;     
        }
        catch(error){
            console.error(error)
            return ({success: false, message: "Error logging in"})
        }
    }
    
    async function createNewAccount(firstName, lastName, username, password){
        try{
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    user: username,
                    password: password,
                    role: "user"
                })
            })
            if (!response.ok){
                console.error("Error!!!");
            }
    
            const result = await response.json();
            return result;    
        }
        catch(error){
            console.error(error)
        }
    }

    // Gets the login credentials and check for validation
    async function login(e){
        e.preventDefault();
        setErrMsg("");

        var missingCredentials = [];
        var missing = false;

        if (loginUserName === ""){
            missing = true;
            missingCredentials.push("username");
        }

        if (loginPassword === ""){
            missing = true;
            missingCredentials.push("password");
        }

        if (missing){
            var missingCredentialsMsg = "Please provide your "
            if (missingCredentials.length > 1){
                missingCredentialsMsg += missingCredentials.slice(0,-1).join("") + " and " + missingCredentials[1];
            }
            else {
                missingCredentialsMsg += missingCredentials[0];
            }
            setErrMsg(missingCredentialsMsg);
            return;
        }

        const result = await checkLogin(loginUserName, loginPassword)

        if (result.success){
            localStorage.setItem("LoginToken", result.token); 
            updateRole(result.role);
            updateUsername(loginUserName);
            updateFirstName(result.firstName);
            updateLastName(result.lastName);
            if (result.role === "user") navigate("/user");
            else if (result.role === "admin") navigate("/admin");
        }
        else {
            setErrMsg(result.message);
        }
    }

    async function signUp(e){
        e.preventDefault();
        setErrMsg("");

        var missing = false;
        var missingFields = [];

        if (newAccountFirstName === "") {
            missing = true;
            missingFields.push("first name");
        }
        if (newAccountLastName === "") {
            missing = true;
            missingFields.push("last name");
        }
        if (newAccountUserName === "") {
            missing = true;
            missingFields.push("username");
        }
        if (newAccountPassword === "") {
            missing = true;
            missingFields.push("password");
        }

        if (missing) {
            let missingText = "Missing: "

            if (missingFields.length > 1) {
                // Add "and" before the last missing field
                missingText += missingFields.slice(0, -1).join(", ") + " and " + missingFields[missingFields.length - 1];
            } else {
                // Only one missing field
                missingText += missingFields[0];
            }
            
            setSignUpErrMsg(missingText);
            return;
        }

        var illegalCharInFields = [];
        var illegal = false;
        const illegalChar = /^[a-zA-Z]+$/;
        const illegalCharInUserName = /[^a-zA-Z0-9_]/

        if (!illegalChar.test(newAccountFirstName)){
            illegal = true;
            illegalCharInFields.push("first name");
        }
        if (!illegalChar.test(newAccountLastName)){
            illegal = true;
            illegalCharInFields.push("last name");
        }
        if (illegalCharInUserName.test(newAccountUserName)){
            illegal = true;
            illegalCharInFields.push("username");
        }

        if (illegal){
            var invalidCharsText = "Illegal characters in ";
            if (illegalCharInFields.length > 1){
                invalidCharsText += illegalCharInFields.slice(0,-1).join(", ") + " and " + illegalCharInFields[illegalCharInFields.length-1];
            }
            else {
                invalidCharsText += illegalCharInFields[0];
            }
            setSignUpErrMsg(invalidCharsText);
            return;
        }
            
        var missingPasswordRequirements = [];
        var badPassword = false;

        const checkForCapital = /[A-Z]/;
        const checkForSpecialChar = /[!@#$%_]/
        const checkForNum = /[0-9]/

        if (!checkForCapital.test(newAccountPassword)) {
            badPassword = true;
            missingPasswordRequirements.push("capital letter");
        }
        if (!checkForSpecialChar.test(newAccountPassword)) {
            badPassword = true;
            missingPasswordRequirements.push("special character");
        }
        if (!checkForNum.test(newAccountPassword)) {
            badPassword = true;
            missingPasswordRequirements.push("number");
        }
        if (newAccountPassword.length < 8) {
            badPassword = true;
            missingPasswordRequirements.push("minimum 8 characters");
        }

        if (badPassword){
            let missingPassword = "Password missing the following: ";
            if (missingPasswordRequirements.length > 1){
                missingPassword += missingPasswordRequirements.slice(0,-1).join(", ") + " and " + missingPasswordRequirements[missingPasswordRequirements.length-1];
            }
            else {
                missingPassword += missingPasswordRequirements[0];
            }
            setSignUpErrMsg(missingPassword);
            return;
        }

        const result = await createNewAccount(newAccountFirstName, newAccountLastName, newAccountUserName, newAccountPassword);

        if (result.success){
            setNewAccountFirstName("");
            setNewAccountLastName("");
            setNewAccountUserName("");
            setNewAccountPassword("");

            setNotificationTitle("Account Creation");
            setNotitificationMsg(result.message);
            setOpenNotification(true)
        }
        else {
            setSignUpErrMsg(result.message);
        }
    }

    function closeNotification(){
        setOpenNotification(false);
    }

    function updateSignUpFirstName(e){
        setNewAccountFirstName(e.target.value);
    }

    function updateSignUpLastName(e){
        setNewAccountLastName(e.target.value)
    }

    function updateSignUpUsername(e){
        setNewAccountUserName(e.target.value)
    }
    
    function updateSignUpPassword(e){
        setNewAccountPassword(e.target.value);
    }


    function switchPage(e){
        e.preventDefault();
        if (!noAccount) {
            setLoginUserName("");
            setLoginPassword("");
            setErrMsg("");
            setNoAccount(true)
            return;
        }
        else {
            setNewAccountFirstName("");
            setNewAccountLastName("");
            setNewAccountUserName("");
            setNewAccountPassword("");
            setSignUpErrMsg("");
            setNoAccount(false)
            return;
        }
    }

    return (
        <>
            <Nav />
            <div className="background">
            {noAccount ?
                <>
                    <h1>Login Here!</h1>
                    <div className="login-container">
                        <div className="login-err-msg">
                            <input id="message"
                                type="text"
                                value = {errMsg}
                                readOnly
                            />
                        </div>
                        <div className="login-credentials">
                            <form>
                                <label htmlFor="username">username: </label>
                                <input id="username" 
                                    type="username"
                                    value= {loginUserName}
                                    placeholder="Enter your username"
                                    onChange= {(e) => setLoginUserName(e.target.value)}
                                />
                                <br />
                                
                                <label htmlFor="password">password: </label>
                                <input id="password" 
                                    type="password"
                                    value= {loginPassword}
                                    placeholder="Enter your password" 
                                    onChange= {(e) => setLoginPassword(e.target.value)}
                                />
                                <br />

                                <button onClick={login}>Login!</button>
                            </form>
                        </div>
                        <button onClick={(e) => switchPage(e)}>No Account? Click here to sign up!</button>
                    </div>
                </>
            :
            <>
                <h1>Sign Up Here!</h1>
                <div className="sign-up-container">
                    <form>
                        <div className="sign-up-err-msg">
                            <input value={signUpErrMsg} readOnly />
                        </div>
                        <label htmlFor="firstname">First Name: </label>
                        <input id="firstname" 
                            type="firstname"
                            value= {newAccountFirstName} 
                            placeholder="Enter your first name"
                            onChange = {updateSignUpFirstName}
                        />
                        <br />

                        <label htmlFor="lastname">Last Name: </label>
                        <input id="lastname" 
                            type="lastname"
                            value= {newAccountLastName} 
                            placeholder="Enter your last name"
                            onChange = {updateSignUpLastName}
                        />
                        <br />

                        <label htmlFor="username1">Username: </label>
                        <input id="username1" 
                            type="username"
                            value= {newAccountUserName} 
                            placeholder="Enter your username"
                            onChange = {updateSignUpUsername}
                        />
                        <br />

                        <label htmlFor="password1">Password: </label>
                        <input id="password1" 
                            type="password"
                            value= {newAccountPassword} 
                            placeholder="Enter your password"
                            onChange= {updateSignUpPassword}
                        />
                        <br />
                        <button onClick={signUp}>Sign Up!</button>
                    </form>
                    <button onClick={(e) => switchPage(e)}>Go Back</button>
                    <p>Password must meet the following requirements:</p>
                    <p>Contain at least one capital letter</p>
                    <p>Contain at least one number</p>
                    <p>Contain at least one special character</p>
                    <p>Must be at least 8 characters</p>
                </div>
            </>
            }
            </div>
            {openNotification && <Notification closeModal={closeNotification} title={notificationTitle} message={notificationMsg}/>}
        </>
    )
}

export default Login