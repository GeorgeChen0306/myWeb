import Nav from "../components/Nav.jsx"
import "../styles/webHome.css";

const HomePage = () => {

    return (
        <>
            <Nav />
            <div className="web-home-background">
                <h1>George's Website Home Page</h1>
                <h2>Welcome!</h2>
                <p>Hi and welcome to my website. On this website you can interact with other users by creating and viewing posts 
                made by you or other users. In order to make a post, you must create an account first. Once you created one,
                you are free to edit that post or even delete it, just like a simple social media.</p>
                <p>There's also a calculator page where you can visit to do basic arithmetic operations.</p>
                <p>There's a Pokemon page too where you select from the drop-list what Pokemon data you want to see. The only available data now is their weight.</p>
                <p>Hope you have fun navigating the pages and thanks for visiting.</p>
            </div>
        </>
    )
}

export default HomePage