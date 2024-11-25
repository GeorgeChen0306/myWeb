import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { deleteUser, findUser } from "./CRUD.js";
import { createUser } from "./accountManagement.js";
import { verifyToken, verifyRedirect } from "./token.js";
import { verifyCredentials } from "./login.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

dotenv.config();

const URL = process.env.URL;

/**
 * Connect to the MongoDB database
 */
async function connect () {
    try{
        await mongoose.connect(URL);
        console.log("Database connection successful");        
    }
    catch (error){
        console.error(error)
    }
}

/**
 * Database schema
 */
const userSchema = new mongoose.Schema({
    user: String,
    password: String,
    role: String,
    loginAttempt: Number,
});

const User = mongoose.model("User", userSchema);

/**
 * 
 * @returns All users in database
 */
async function find(){
    try{
        const user = await findUser(User);
        return user;
    }
    catch(error){
        console.error(error);
    }
}

// Add a new user to the database
async function addUser(newUser){
    try{
        var password = null;
        var role = "user";
        
        if ("password" in newUser){
            password = newUser.password
        }

        if ("role" in newUser){
            role = newUser.role;
        }

        console.log(password)
        const user = await createUser(newUser.user, password, role, User);
        return user;
    }
    catch (error){
        console.error(error);
        return ({success: false});
    }
}

// Delete the target
async function deleteTarget(target){
    try{
        const result = await deleteUser(target,User);
        return result;
    }
    catch (error){
        console.error(error);
        return ({success: false});
    }
}

// Check for login
async function login(data){
    try{
        const result = await verifyCredentials(data.user, data.password, User, process.env.SECRET_KEY);
        return result;
    }
    catch(error){
        console.error(error)
        return ({success: false});
    }
}

connect(); // Start the database connection

/*-------------------------------------------------------------------------------------------------------------- */
app.get("/", (req, res) => {
    res.send("Hello, welcome to the server");
})


app.post("/api/users", async (req, res) => {
    const addUsers = await addUser(req.body);
    res.json(addUsers);
})

// Get all users in the database
app.get("/api/users", async (req, res) => {
    const getUsers = await find();
    res.json(getUsers);
})

// Delete a specific user by their username
app.delete("/api/delete", async (req, res) => {
    const deleteUser = await deleteTarget(req.body);
    res.json(deleteUser);
})

app.post("/api/login", async (req, res) => {
    const data = await login(req.body);
    res.json(data);
})

app.post("/api/verify", async (req, res) => {
    var token = "";
    if (req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }

    const verify = await verifyToken(token, process.env.SECRET_KEY);
    console.log(verify);
    res.json(verify);
})

app.post("/api/authRedirect", async (req, res) => {
    var token = "";
    
    if (req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }

    const result = await verifyRedirect(token, process.env.SECRET_KEY);
    res.json(result);
})

app.listen("3001", (req, res) =>{
    console.log("Listening on port 3001");
})