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

async function addNewUser(firstName, lastName, username, password, role, User){
    try{
        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            user: username,
            password: password,
            role: role,
            loginAttempt: 0,
        })
        return ({
                    success: true, 
                    message: `Your account has been successfully created`
                })
    }
    catch(error){
        console.error(error)
        return ({
                    success: false,
                    message: "Error when creating the account. Please try again."
                });
    }
}

async function addNewPost(title, username, content, Post, PostId){
    try{
        var id = null;
        const result = await PostId.find({unique: "postid"});
        if (result.length === 1){
            id = result[0]["pid"];
        }

        const post = await Post.create({
            pid: id,
            title: title,
            author: username,
            date: new Date(),
            content: content
        })

        const result1 = await PostId.updateOne({unique: "postid"}, {$inc : {pid : 1}});

        return ({
                    success: true,
                    message: "New post added"
                })
    }
    catch(error){
        console.error(error);
        return ({success: false, message: "Failed adding the post"})
    }
}

async function updateOldPost(pid, content, Post){
    try{
        const result = await Post.find({pid: pid});
        console.log(result);

        if (result.length === 1) {
            const result1 = await Post.updateOne({pid: pid}, {content: content});


            console.log(result1);
            return ({success: true, message: "Post updated"})
        }
    }
    catch(error){
        console.error(error);
        return ({success: false, message: "Failed updating the post"})
    }
}

export {findUser, deleteUser, addNewUser, addNewPost, updateOldPost};