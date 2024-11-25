import jwt from "jsonwebtoken";

async function createToken(username, role, secretKey){
    const payload = {
        user: username,
        role: role
    }

    return await jwt.sign(payload, secretKey, {expiresIn: "4hr"});
}

async function verifyToken(token, secretKey){
    const verify = await jwt.verify(token, secretKey, function (err, decoded){
        if (err){
            return {isAuthorized: false};
        }
        else return {isAuthorized: true, decoded};
    })
    return verify
}

async function verifyRedirect(token, secretKey){
    const verify = await jwt.verify(token, secretKey, function (err, decoded){
        if (err){
            return ({isAuthorized: false})
        }
        else {
            console.log("Decoded role");
            console.log(decoded);
            console.log(decoded.role);
            return (
                {
                    isAuthorized: true,
                    redirect: decoded.role
                })
        }
    })
    return verify;
}

export {createToken, verifyToken, verifyRedirect}