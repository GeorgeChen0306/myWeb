import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/nav.css";

const Nav = ({role = "public"}) => {

    const links = {
        public: [
                    {name: "Home", path: "/"},
                    {name: "Pokemon", path: "/pokemon"},
                    {name: "Login", path: "/login"}
                ],

        user: [
                {name: "Home", path: "/"},
                {name: "Pokemon", path: "/pokemon"},
                {name: "My Profile", path: "/user/profile"}
              ],

        admin: [
                {name: "Home", path: "/"},
                {name: "Pokemon", path: "/pokemon"},
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
                    {/* <li>
                        <Link to="/" className="title">Home</Link>
                    </li>
                    <li>
                        <Link to="/pokemon">Pokemon</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    {role === "user" && (
                        <>
                            <li>
                                <Link to="/user/profile">My Profile</Link>
                            </li>
                        </>
                    )} */}
                </ul>
            </nav>
        </>
    )
}

export default Nav;