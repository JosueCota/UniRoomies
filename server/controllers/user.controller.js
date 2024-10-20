const sequelize  = require("../database.js");
const bcrypt = require("bcryptjs")
const User = sequelize.models.User
const asyncHandler = require("express-async-handler");


//Update User Password with the req.user sent and new password
const updateUserPassword = asyncHandler(async (req, res) => {

    const { oldPassword, newPassword } = req.body;
    const id = req.user.id; 
    
    const user = await User.findByPk(id);

    //Verify User Sent old Password
    const verify = await bcrypt.compare(oldPassword, user.password )
    if (!verify) {
        res.status(404);
        throw new Error("User provided incorrect password");
    }

    //Salt and Hash New Password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    const body = await User.update(
        {password: hashedPassword },
        {
            where: {
                id: id
            }
    });

    res.status(200).send("Updated Password!")

});


//Updates User basic info (NOT PASSWORD)
const updateUser = asyncHandler(async(req, res) => {
      
    const user = await User.findByPk(req.user.id);
    
    if (user){
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;

        const updatedUser = await user.save()
        
        res.status(200).json({
            id: updatedUser.id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email
        })

    } else {
        res.status(404);
        throw new Error("User not found")
    }
});

const getUser = asyncHandler(async (req, res) => {
  
    const user = {
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
    };

    res.status(200).json(user)

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
    getUser,
    updateUser,
    updateUserPassword
}