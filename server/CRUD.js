async function findUser(User){
    try{
        const user = await User.find();
        return user;
    }
    catch(error){
        console.error(error);
        return ({success: false});
    }
}

async function deleteUser(target, User){
    try{
        const user = await User.deleteOne({user: {$eq: target.user}});
        if (user.acknowledged && user.deletedCount === 1) return ({success: true})
        else return ({success: false});
    }
    catch(error){
        console.error(error);
        return ({success: false})
    }
}

async function addNewUser(username, password, role, User){
    try{
        const user = await User.create({
            user: username,
            password: password,
            role: role,
            loginAttempt: 0,
        })
        return ({success: true, user})
    }
    catch(error){
        console.error(error)
        return ({success: false});
    }
}

export {findUser, deleteUser, addNewUser};