import { Link } from "react-router-dom";
import "./styles/nav.css";
import { useRole } from "./Role.js";

const Nav = () => {

    const { role } = useRole();

    const links = {
        public: [
                    {name: "Web Home", path: "/"},
                    {name: "Pokemon", path: "/pokemon"},
                    {name: "Posts", path: "/posts"},
                    {name: "Login", path: "/login"}
                ],

        user: [
                {name: "Web Home", path: "/"},
                {name: "Home", path: "/user"},
                {name: "Pokemon", path: "/pokemon"},
                {name: "Posts", path: "/posts"},
                {name: "My Profile", path: "/user/profile"}
              ],

        admin: [
                {name: "Web Home", path: "/"},
                {name: "Home", path: "/admin"},
                {name: "Pokemon", path: "/pokemon"},
                {name: "Posts", path: "/posts"},
                {name: "Users", path: "/admin/users"},
                {name: "My Profile", path: "/admin/profile"}
               ]
    }

    const tabs = links[role];

    return (
        <>
            <nav className="nav">
                <ul>
                    {tabs.map((tab) => (
                        <li key={tab.path}>
                            <Link to={tab.path}>{tab.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}

export default Nav;