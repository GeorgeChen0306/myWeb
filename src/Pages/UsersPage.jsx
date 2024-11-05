import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav";

const Users = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const [res, setRes] = useState();

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

    async function addUser(user, pass){
        try{
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({"user": user, "password": pass})
            });

            if (!response.ok){
                console.error("Error");
            }
            const result = await response.json();
            setRes(result);
            result.success ? window.alert("New user added") : window.alert("Failed to add user");
            setIsLoading(false);
        }
        catch (error){
            console.error(error);
        }
    }

    async function userInfo(event){
        event.preventDefault();
        const user = document.getElementById("input").value;
        const pass = document.getElementById("pass").value;

        if (!user || !pass){
            window.alert("Please fill out both fields");
            return;
        }
        await addUser(user, pass);
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
                <label htmlFor="pass">password: </label>
                <input id="pass" type="password"></input>
                <br />
                <button onClick={userInfo} style={{marginTop: "10%"}}>Click here to add an user!</button>
            </form>
        </>
    )
}

export default Users;