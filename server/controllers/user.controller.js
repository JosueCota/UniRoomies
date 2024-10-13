const sequelize  = require("../database.js");

const User = sequelize.models.User

const updateUser = (req, res) => {
    //Update User with the req.body.id sent
}

const getUsers = (req, res) => {
    //Get all users
}

const getUser = async (req, res) => {
    const user = await User.findByPk(req.body.id);

    if (user) {
        res.send(user)
    } else {
        console.log("User Not Found")
    }
}

const deleteUser = (req, res) => {
    //Delete user based on id sent
    
}

module.exports = {
    deleteUser,
    getUser,
    updateUser,
    getUsers
}