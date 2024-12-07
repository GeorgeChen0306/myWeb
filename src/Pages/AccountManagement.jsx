import { useState, useEffect } from "react";
import Nav from "../components/Nav";

const Users = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();

    async function getData(){
        try{
            const response = await fetch("/api/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json", 
                }
            });

            if (!response.ok){
                console.error("Error");
            }
            const data = await response.json();
            setData(data);
            setIsLoading(false);
            return data;
        }
        catch (error){
            console.error(error);
        } 
    }

    async function addUser(user){
        try{
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({"user": user})
            });

            if (!response.ok){
                console.error("Error");
            }
            const result = await response.json();
            result.success ? window.alert("New user added") : window.alert("Failed to add user");
            setIsLoading(false);
        }
        catch (error){
            console.error(error);
        }
    }

    async function deleteUser(user){
        try{
            const response = await fetch("/api/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({"user": user})
            });

            if (!response.ok){
                console.error("Error");
            }

            const result = await response.json();
            result.success ? window.alert("User deleted") : window.alert("Failed to delete selected user");
            window.location.reload();
        }
        catch(error){
            console.error(error)
        }
    }

    async function checkDelete(event){
        event.preventDefault();
        const user = document.getElementById("deleteInput").value;

        if (!user){
            window.alert("Please type the username to delete");
            return;
        }
        console.log(user);
        await deleteUser(user);
    }

    async function userInfo(event){
        event.preventDefault();
        const user = document.getElementById("input").value;

        if (!user){
            window.alert("Please provide an username");
            return;
        }
        await addUser(user);
    }

    useEffect(() => {
        getData();
        },[]);

    return(
        isLoading ? <h1>Waiting............</h1>
        :
        <>
            <Nav />
            <h1>Here is the list of users:</h1>
            {
                data.map((element, index) => {
                    return <li key={index}>{data[index]["user"]}</li>
                })
            }
            <br />
            <form>
                <label htmlFor="input">username: </label>
                <input id="input" type="user"></input>
                <br />
                <button onClick={userInfo} style={{marginTop: "2%", marginBottom: "5%"}}>Click here to add an user!</button>
            </form>
            <hr />
            <form>
                <label htmlFor="deleteInput">username: </label>
                <input id="deleteInput" type="user"></input>
                <br />
                <button onClick={checkDelete} style={{marginTop: "2%"}}>Click here to delete an user!</button>
            </form>
        </>
    )
}

export default Users;