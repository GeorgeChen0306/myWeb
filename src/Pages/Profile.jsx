import { useRole } from "../Role.js"
import { useNavigate } from "react-router-dom";
import Nav from "../Nav.jsx";

const MyProfile = () => {

    const navigate = useNavigate();
    const { role, username, firstName, lastName, logout } = useRole();

    function signOut(){
        logout();
        navigate("/");
    }

    return (
        <>
            <Nav />
            <h1>My Profile</h1>
            <h3>First Name: {firstName}</h3>
            <h3>Last Name: {lastName}</h3>
            <h3>Username: {username}</h3>
            <h3>Role: {role}</h3>
            <button onClick={signOut}>Sign Out</button>
        </>
    )
}

export default MyProfile