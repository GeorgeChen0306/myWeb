import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useRole } from "../Role.js";
import Nav from "../Nav"

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
            if (result.success){
                localStorage.setItem("LoginToken", result.token); 
                updateRole(result.role);
                updateUsername(username);
                updateFirstName(result.firstName);
                updateLastName(result.lastName);
                if (result.role === "user") navigate("/user");
                else if (result.role === "admin") navigate("/admin");
            }
            else {
                console.log(result.message);
                setErrMsg(result.message);
            }
            
        }
        catch(error){
            console.error(error)
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
    
            if (result.success){
                window.alert(result.message);
                setNewAccountFirstName("");
                setNewAccountLastName("");
                setNewAccountUserName("");
                setNewAccountPassword("");
            }
            else {
                window.alert(result.message)
            }    
        }
        catch(error){
            console.error(error)
        }
    }

    function login(e){
        e.preventDefault();
        if (loginUserName === "" || loginPassword === "") {
            window.alert("Please fill in both fields");
            return;
        }
        checkLogin(loginUserName, loginPassword)
    }

    function signUp(e){
        e.preventDefault();
        if (newAccountFirstName === "" || newAccountLastName === "" || newAccountUserName === "" || newAccountPassword === "") {
            window.alert("Please fill in all fields");
            return;
        }
        createNewAccount(newAccountFirstName, newAccountLastName, newAccountUserName, newAccountPassword);
    }

    function switchPage(e){
        e.preventDefault();
        if (!noAccount) {
            setLoginUserName("");
            setLoginPassword("");
            setNoAccount(true)
            return;
        }
        else {
            setNewAccountUserName("");
            setNewAccountPassword("");
            setNoAccount(false)
            return;
        }
    }

    return (
        <>
            <Nav />
            {noAccount ?
            <>
                <h1>Login Here!</h1>
                <input id="message"
                       type="text"
                       value = {errMsg}
                       readOnly
                       style = {{width: "360px"}}
                />
                <form>
                    <label htmlFor="username">Username:</label>
                    <input id="username" 
                           type="username"
                           value= {loginUserName}
                           onChange= {(e) => setLoginUserName(e.target.value)}
                     />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input id="password" 
                           type="password"
                           value= {loginPassword} 
                           onChange= {(e) => setLoginPassword(e.target.value)}
                    />
                    <br />
                    <button onClick={login}>Login!</button>
                </form>
                
                <br />
                <br />
                <button onClick={(e) => switchPage(e)}>No Account? Click here to sign up!</button>
            </>
            :
            <>
                <h1>Sign Up Here!</h1>
                <form>
                    <label htmlFor="firstname">First Name:</label>
                    <input id="firstname" 
                           type="firstname"
                           value= {newAccountFirstName} 
                           onChange = {(e) => setNewAccountFirstName(e.target.value)}
                    />
                    <br />
                    <label htmlFor="lastname">Last Name:</label>
                    <input id="lastname" 
                           type="lastname"
                           value= {newAccountLastName} 
                           onChange = {(e) => setNewAccountLastName(e.target.value)}
                    />
                    <br />
                    <label htmlFor="username1">Username:</label>
                    <input id="username1" 
                           type="username"
                           value= {newAccountUserName} 
                           onChange = {(e) => setNewAccountUserName(e.target.value)}
                    />
                    <br />
                    <label htmlFor="password1">Password:</label>
                    <input id="password1" 
                           type="password"
                           value= {newAccountPassword} 
                           onChange= {(e) => setNewAccountPassword(e.target.value)}       
                    />
                    <br />
                    <button onClick={signUp}>Sign Up!</button>
                    <br />
                    <br />
                    <br />
                    <button onClick={(e) => switchPage(e)}>Go Back</button>
                </form>
            </>
            }
        </>
    )
}

export default Login