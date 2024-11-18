const sequelize  = require("../database.js");
const bcrypt = require("bcryptjs")
const User = sequelize.models.User
const UserDetails = sequelize.models.User_Detail
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
        user.pfp = req.body.pfp || user.pfp;

        const updatedUser = await user.save()
        
        res.status(200).json({
            id: updatedUser.id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            isActive: updatedUser.isActive,
            pfp: updatedUser.pfp
        })

    } else {
        res.status(404);
        throw new Error("User not found")
    }
});

//Updates user isActive Attribute
const updateActiveUser = asyncHandler(async (req,res) => {

    const user = await User.findByPk(req.user.id);

    //Check user exists
    if (!user) {
        res.status(401);
        throw new Error("User Not Found");
    }
    
    //Check if they aren't registered
    if (!user.isRegistered){
        res.status(401);
        throw new Error("User Isn't Registered")
    }
    
    //Check if they have details
    const userDetails = await UserDetails.findOne({where: {UserId: req.user.id}});
    if (!userDetails) {
        res.status(404);
        throw new Error("User Hasn't Updated Details")
    }

    //Simply assign !current 
    user.isActive = !user.isActive;

    const updatedUser = await user.save();

    res.status(200).json({
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        isActive: updatedUser.isActive,
        pfp: updatedUser.pfp
    });
});

//Updates user_details
const updateUserDetails = asyncHandler(async (req,res) => {

    const newUserDetails = {
        budget: req.body.budget,
        cities: req.body.cities,
        room_sharing: req.body.room_sharing,
        age: req.body.age,
        gender: req.body.gender,
        move_in_date: req.body.move_in_date,
        roommate_desc: req.body.roommate_desc || null,
        is_smoker: req.body.is_smoker!== undefined ? req.body.is_smoker : null,
        stay_length: req.body.stay_length || null,
        accomodations: req.body.accomodations || null,
        couples_ok: req.body.couples_ok!== undefined?req.body.couples_ok: null,
        pet_owner:  req.body.pet_owner!== undefined?req.body.pet_owner: null,
        parking_needed:  req.body.parking_needed!== undefined? req.body.parking_needed: null,
        contacts: req.body.contacts || null,
        hobbies: req.body.hobbies || null,
        UserId: req.user.id
    }

    let userDetails = await UserDetails.findOne({where: {UserId: req.user.id}});

    if (!userDetails) {
        //Create a userDetails for user
        const user = await User.findByPk(req.user.id);
        const newUserDet = await UserDetails.create(newUserDetails);
        
        user.setUser_Detail(newUserDet);
        user.isActive = true;

        //If its being created, then its their first time, we want to make their account active 
        await user.save()

        res.status(200).json({message: "User Details Created"});
    } else {
        //Update users details
        Object.assign(userDetails, req.body);

        await userDetails.save()
        res.status(200).json({message: "User Details Updated"})   
    }
});

//Return user details 
const getUserDetails = asyncHandler(async (req,res) => {
    
    let userDetails = await UserDetails.findOne({
        where: {UserId: req.user.id},
         attributes: {
            exclude: ["id", "UserId"]
    } });
    
   
   if (!userDetails) {
    res.status(200);
    res.json(null)
   } 
   res.status(200);

   res.json({userDetails: userDetails})

});

//Delete user with password confirmation
const deleteUser = asyncHandler(async (req, res) => {

    const user = await User.findByPk(req.user.id);

    if (!user){
        res.status(404);
        throw new Error("User Does't Exist")
    }

    const verify = await bcrypt.compare(req.body.password, user.password)

    if (!verify) {
        res.status(401);
        throw new Error("Password is Incorrect")
    } 

    const delUser = await user.destroy()

    if (delUser) {
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0)
        })
        res.status(200).json({message:"Successfully Deleted"});
    } else {
        res.status(400);
        throw new Error("Error Deleting User")
    }
});

module.exports = {
    deleteUser,
    updateUser,
    updateUserPassword,
    updateActiveUser,
    updateUserDetails,
    getUserDetails
}