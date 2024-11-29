import { useRole } from "../Role.js";
import Nav from "../Nav.jsx";

const UserHome = () => {

    const { role } = useRole();

    return (
        <>
            <Nav/>
            <h1>Login Home Page</h1>
            <p>Hello, welcome to your home page. Here you can view some features that are unique to you!</p>
        </>
    )
}

export default UserHome