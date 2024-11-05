import Nav from "../Nav.jsx"

const HomePage = () => {
    return (
        <>
            <Nav />
            <h1>George's Website Home Page</h1>
            <p>Hello! Welcome to my web page. There are currently two pages you can visit, namely, the pokemon and user pages</p>
            <p>In the pokemon page, you will be able to select a pokemon from the drop-down list and it will give you their weight</p>
            <p>In the user page, you will be able to see all the user(s) that are in the database and also add a user to the database</p>
        </>
    )
}

export default HomePage