import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { deleteUser, addNewPost, updateOldPost } from "./CRUD.js";
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
       
        const db = mongoose.connection.useDb("webUsers");
 
        return db;
    }
    catch (error){
        console.error(error)
    }
}


/**
 * Database schema
 */
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    user: String,
    password: String,
    role: String,
    loginAttempt: Number,
});

const postSchema = new mongoose.Schema({
    pid: Number,
    title: String,
    author: String,
    date: Date,
    content: String,
})

const postIdSchema = new mongoose.Schema({
    pid: Number,
    unique: String
})

// Add a new user to the database
async function addUser(newUser){
    try{
        var password = null;
        //var role = "user";
        
        if ("password" in newUser){
            password = newUser.password
        }

        // if ("role" in newUser){
        //     role = newUser.role;
        // }

        console.log(password)
        const user = await createUser(newUser.firstName, newUser.lastName, newUser.user, password, newUser.role, User);
        return user;
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

const db = await connect(); // Start the database connection
const User = db.model("User", userSchema, "users");
const Post = db.model("Post", postSchema);
const PostId = db.model("Postid", postIdSchema, "postid");

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
    try{
        const getUsers = await User.find().select("-_id -password "); // Exclude id and password
        res.json(getUsers);
    }
    catch(error){
        console.error("Error retrieving users ", error);
        res.json([]);
    }
})

// Delete a specific user by their username
app.delete("/api/delete", async (req, res) => {
    try{
        const result = await deleteUser(req.body);
        res.json(result);
    }
    catch (error){
        console.error(error);
        return ({success: false})
    }
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

// Get all the posts
app.get("/api/posts", async (req, res) => {
    try{
        const result = await Post.find().select("-_id");
        res.json(result);
    }
    catch (error){
        console.error(error);
        res.json([]);
    }
})

// Add the post
app.post("/api/createPost", async (req, res, next) => {
    var token = "";

    if (req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }

    const verify = await verifyToken(token, process.env.SECRET_KEY);
    if (verify.isAuthorized){
        req.userData = verify
        next();
    }
    else {
        res.json({success: false, message: "Unauthorized method access"})
    }
}, async (req, res) => {
    const result = await addNewPost(req.body.title, req.userData.decoded.user, req.body.content, Post, PostId);
    res.json(result);
})

app.post("/api/updatePost", async (req, res, next) => {
    var token = "";

    if (req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }

    const verify = await verifyToken(token, process.env.SECRET_KEY);
    if (verify.isAuthorized){
        req.userData = verify
        next();
    }
    else {
        res.json({success: false, message: "Unauthorized method access"})
    }
}, async (req, res) => {
    try{
        console.log(req.body);
        const result = await updateOldPost(req.body.postId, req.body.content, Post);
        res.json(result);    
    }
    catch(error){
        console.error(error);
        res.json({success: false, message: "Unable to process the update"});
    }
})

app.listen("3001", (req, res) =>{
    console.log("Listening on port 3001");
})