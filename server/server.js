import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

dotenv.config();

const URL = process.env.URL;

async function connect () {
    try{
        await mongoose.connect(URL);
        console.log("Database connection successful");        
    }
    catch (error){
        console.error(error)
    }
}

const userSchema = new mongoose.Schema({
    user: String,
    password: String,
});

const User = mongoose.model("User", userSchema);

async function find(){
    try{
        const user = await User.find();
        return user;
    }
    catch(error){
        console.error(error);
    }
}

async function add(newUser){
    try{
        const user = await User.create({user: newUser.user, password: newUser.password});
        return ({success: true, user});
    }
    catch (error){
        console.error(error);
        return ({success: false});
    }
}

connect();

app.get("/", (req, res) => {
    res.send("Hello, welcome to the server");
})

app.post("/api/users", async (req, res) => {
    const addUsers = await add(req.body);
    res.json(addUsers);
})

app.get("/api/users", async (req, res) => {
    const getUsers = await find();
    res.json(getUsers);
})

app.listen("3001", (req, res) =>{
    console.log("Listening on port 3001");
})