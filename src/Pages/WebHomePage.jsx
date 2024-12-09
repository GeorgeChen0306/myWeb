import Nav from "../components/Nav.jsx"
import { useRole } from "../context/Role.js"

const HomePage = () => {

    const { role, username, updateRole, updateUsername, logout } = useRole();

    return (
        <>
            <Nav />
            <h1>George's Website Home Page</h1>
            <h1>Role: {role}</h1>
            <h1>Username: {username ? username : "N/A"}</h1>
            <button onClick={() => updateRole("admin")}>Set Role to Admin</button>
            <button onClick={() => updateUsername("george")}>Set Username to George</button>
            <button onClick={logout}>Logout</button>
        </>
    )
}

export default HomePage