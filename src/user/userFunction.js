const User= require("./userTable");

//ADD USER FUNCTION
exports.addUser = async (userObj) => {
    try {
        await User.create(userObj)
    } catch (error) {
        console.log(error)


    }
}

// LIST USERS FUNCTION
exports.listUsers = async () => {
    try {
        return await User.findAll()
    } catch (error) {
        console.log(error)


    }
}


//UPDATE USER FUNCTION
exports.updateUser = async (userObj) => {
    try {
        await User.update({name: userObj.newName, email: userObj.newEmail}, {
            where: {
                name: userObj.name,
                email: userObj.email
            },
        });
    } catch (error) {
        console.log(error)


    }
}

// DELETE USER FUNCTION
exports.deleteUser = async (userObj) => {
    try {
        return await User.destroy({
            where: {
                name: userObj.name,
                email: userObj.email
            },
        })
    } catch (error) {
        console.log(error)

    }
}




