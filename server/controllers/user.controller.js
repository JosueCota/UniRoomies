const sequelize  = require("../database.js");
const bcrypt = require("bcryptjs")
const User = sequelize.models.User
const asyncHandler = require("express-async-handler");


//Update User Password with the req.user sent and new password
const updateUserPassword = asyncHandler(async (req, res) => {

    const { oldPassword, newPassword } = req.body;
    const id = req.user.id; 
    
    const user = await User.findByPk(id);

    if (!user) {
        res.status(404);
        throw new Error("User doesn't exist")
    }

    //Verify User Sent old Password
    const verify = await bcrypt.compare(oldPassword, user.password)

    if (verify=== false) {
        res.status(404);
        throw new Error("User provided incorrect password")
    }

    if (oldPassword === newPassword) {
        res.status(401);
        throw new Error("User Provided Same Password")
    }
    
    
    //Salt and Hash New Password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);
    user.password = hashedPassword;
    
    await user.save()

    res.status(200).json({message: "Updated Password!"})

});


//Updates User basic info (NOT PASSWORD)
const updateUser = asyncHandler(async(req, res) => {
      
    const user = await User.findByPk(req.user.id);
    
    if (user){
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;

        const updatedUser = await user.save()
        
        res.status(200).json({
            id: updatedUser.id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            isActive: updatedUser.isActive
        })

    } else {
        res.status(404);
        throw new Error("User not found")
    }
});

const getUsers = asyncHandler(async (req, res) => {
    
    //Returns array of users (will be users joined with user_details)
    
    // res.status(200).json(users)

});

//Delete user
const deleteUser = asyncHandler(async (req, res) => {

    const delUser = await User.destroy({
        where: {
            email: req.user.email
        }
    })

    if (delUser) {
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0)
        })
        res.status(200).send("Successfully Deleted");

    } else {
        res.status(400);
        throw new Error("Error Deleting User")
    }
});

module.exports = {
    deleteUser,
    getUsers,
    updateUser,
    updateUserPassword
}