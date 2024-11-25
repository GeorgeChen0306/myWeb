import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Nav from "../Nav"

const Login = () =>{

    const navigate = useNavigate();

    const [noAccount, setNoAccount] = useState(true);
    const [loginUserName, setLoginUserName] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [newAccountUserName, setNewAccountUserName] = useState("");
    const [newAccountPassword, setNewAccountPassword] = useState("");

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
                navigate("/user");
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
    
    async function createNewAccount(username, password){
        try{
            const response = await fetch("/api/users", {
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
    
            console.log(result);    
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
        if (newAccountUserName === "" || newAccountPassword === "") {
            window.alert("Please fill in the fields");
            return;
        }
        createNewAccount(newAccountUserName, newAccountPassword);
    }

    function switchPage(){
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
                <button onClick={() => switchPage()}>No Account? Click here to sign up!</button>
            </>
            :
            <>
                <h1>Sign Up Here!</h1>
                <form>
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
                    <button onClick={() => switchPage()}>Go Back</button>
                </form>
            </>
            }
        </>
    )
}

export default Login