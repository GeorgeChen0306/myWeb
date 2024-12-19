import bcrypt from "bcrypt"
import { createToken } from "./token.js";

async function verifyCredentials(username, password, User, secretKey){
    const check = await User.find({user: username});
    if (check.length > 0) {
        // Input password matches the hash
        if (await bcrypt.compare(password, check[0]["password"])){
            if (check[0]["loginAttempt"] > 0){
                const result1 = await User.updateOne({user: username}, {loginAttempt: 0}) // Update the login attempt
            }
            // Create a JWT token
            const result = await createToken(username, check[0]["role"], secretKey);
            return ({
                        success: true,
                        token: result,
                        role: check[0]["role"],
                        firstName: check[0]["firstName"],
                        lastName: check[0]["lastName"]
                    })
        }
        else{
            const result1 = await User.updateOne({user: username}, {loginAttempt: check[0]["loginAttempt"] + 1})
            return ({
                        success: false, 
                        message: "Wrong password"
                    });
        }
    }
    else{
        return ({
                    success: false,
                    message: "No matched username"
                })
    }
}

export {verifyCredentials}