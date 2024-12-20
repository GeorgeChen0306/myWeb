import bcrypt from "bcrypt";
import { addNewUser } from "./CRUD.js";
import { checkNewAccountInputValidation, checkForIllegalChars } from "./inputValidation.js";

function checkPasswordRequirements(newAccountPassword){
    var missingPasswordRequirements = [];
        var badPassword = false;

        const checkForCapital = /[A-Z]/;
        const checkForSpecialChar = /[!@#$%_]/
        const checkForNum = /[0-9]/

        if (!checkForCapital.test(newAccountPassword)) {
            badPassword = true;
            missingPasswordRequirements.push("capital letter");
        }
        if (!checkForSpecialChar.test(newAccountPassword)) {
            badPassword = true;
            missingPasswordRequirements.push("special character");
        }
        if (!checkForNum.test(newAccountPassword)) {
            badPassword = true;
            missingPasswordRequirements.push("number");
        }
        if (newAccountPassword.length < 8) {
            badPassword = true;
            missingPasswordRequirements.push("minimum 8 characters");
        }

        if (badPassword){
            return ({isValid: false, message: "Password doesn't meet all the requirements"});
        }
        else {
            return ({isValid: true})
        }
}

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

async function createUser(firstName, lastName, username, password, role, User){
    const userExist = await User.find({user: username});
    if (userExist.length > 0){
        return ({
                    success: false,
                    message: `${username} already existed`
                })
    }
    var pass = "";

    if (!password){
        var invalidPassword = true;
        while (invalidPassword){
            pass = randomPasswordGenerator();
            var checkPassword = checkPasswordRequirements(pass);
            if (checkPassword.isValid) invalidPassword = false;
        }
    }
    else {
        pass = password;
        if (!checkPasswordRequirements(pass).isValid){
            return ({success: false, message: "Password fails to meet all requirements"})
        }
    }

    const validationResult = checkNewAccountInputValidation(firstName, lastName, username);
    if (validationResult.missing){
        return ({success: false, message: validationResult.message});
    }

    const invalidChars = checkForIllegalChars(firstName, lastName, username);
    if (invalidChars.invalid){
        return ({success: false, message: invalidChars.message});
    }

    var saltRounds = 10;
    var hashed = await bcrypt.hash(pass, saltRounds);

    const result = await addNewUser(firstName, lastName, username, hashed, role, User);
    return result;
}

export {createUser};