const db  = require("../database.js");
const asyncHandler = require("express-async-handler")

const Room = db.models.Room;
const User = db.models.User;

const createRoom = asyncHandler(async (req, res) => {
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


const getRoom = asyncHandler(async (req, res) => {
    //Show room based off req.body.id
    
});

const getRooms = asyncHandler(async (req, res) => {
    //Show rooms

    //If pagination, might need to grab 10, then do 10(n)-9 - 10(n)
});


module.exports = {
    createUser,
    login
}