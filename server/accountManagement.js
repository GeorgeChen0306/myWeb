import bcrypt from "bcrypt";
import { addNewUser } from "./CRUD.js";

function randomPasswordGenerator(){
    var characterList = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&_" // List of characters used to generate a password
    var randomlyGeneratedPassword = "";
    var passwordLength = Math.floor(Math.random() * (5) + 12); // make the length of the password between 12 and 16 inclusive

    for (let i = 0; i < passwordLength; ++i){
        let randomNum = Math.floor(Math.random() * (characterList.length-1));
        randomlyGeneratedPassword += characterList.charAt(randomNum);
    }

    return randomlyGeneratedPassword;
}

async function createUser(username, password, role, User){
    var pass = "";
    if (!password){
        pass = randomPasswordGenerator();
    }
    else pass = password;

    console.log(pass);
    var saltRounds = 10;
    var hashed = await bcrypt.hash(pass, saltRounds);

    const result = await addNewUser(username, hashed, role, User);
    return result;
}

export {createUser};