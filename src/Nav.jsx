import { Link } from "react-router-dom";
import "./styles/nav.css";

const Nav = () => {

    return (
        <>
            <nav className="nav">
                <ul>
                    <li>
                        <Link to="/" className="title">Home</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                    <li>
                        <Link to="/pokemon">Pokemon</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Nav;