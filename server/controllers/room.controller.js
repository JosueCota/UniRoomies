const db  = require("../database.js");
const asyncHandler = require("express-async-handler")
const { s3Upload, s3RemoveImages } = require("../s3Service");

const Room = db.models.Room;
const User = db.models.User;
const RoomImage = db.models.Room_Image;

const createRoom = asyncHandler(async (req, res, next) => {
    
    const newRoomParam = {
        location: req.body.location,
        price: req.body.price,
        description: req.body.description,
        amenities: req.body.amenities,
        current_household: req.body.current_household,
        UserId: req.user.id
    }
    
    let room = await Room.findOne({where: {UserId: req.user.id}});

    if (!room) {
        //Create a room for user
        const user = await User.findByPk(req.user.id);
        const newRoom = await Room.create(newRoomParam);
        
        user.setRooms(newRoom);
        user.isActive = true;
        console.log(newRoom);
        //If its being created, then its their first time, we want to make their account active 
        req.room = newRoom.room_id;
        await user.save()
        next()
        // res.status(200).json({message: "Room Created"});
    } else {
        //Update users details
        Object.assign(room, req.body);
        await room.save()
        req.room = room.room_id;
        next()
        // res.status(200).json({message: "Room Updated"})   
    }
});


const updateRoomImages = asyncHandler(async (req, res) => {
    let image = await RoomImage.findOne({where: {RoomId: req.room}})

    let images = {
        RoomId: req.room
    }

    const results = await s3Upload(req.files, "roomImages")    
    for (let i=0; i<5; i++){
        images[`image${i+1}`] = results[i] || null;
    }

    if (!image) {
        const room = await Room.findByPk(req.room.id)
        const newImg = await RoomImage.create(images)

        room.setRoom_Images(newImg);

        res.status(200).json({message: "Room Created"})   
    } else {
        
        let keys = []
        for (let i = 0; i <5; i++) {
            if (image[`image${i}`]) {
                keys.push(image[`image${i}`]); 
                console.log(keys)
            }
        }

        await s3RemoveImages(path="roomImages" ,keys);

        Object.assign(image, images);
        await image.save()

        res.status(200).json({message: "Room Updated"})   
    }
})

const getRoom = asyncHandler(async (req, res) => {
    //Show room based off req.body.id

    const {count, rows:rooms} = await User.findAndCountAll(
        {
            where: {
                id: req.user.id,
            },
            attributes: ["firstName", "lastName"], 
            include: [{
                model: Room,
                attributes: ["location", "price"],
                include: [
                    {
                        model: RoomImage,
                        attributes:["image1"],
                    }
                ]
            }]
        })  
    // const urls = params.map(param => {
    //     return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${param.Key}`
    // })
});

const getRooms = asyncHandler(async (req, res) => {
    //Show rooms

    //If pagination, might need to grab 10, then do 10(n)-9 - 10(n)
});


module.exports = {
    createRoom,
    getRooms,
    updateRoomImages
}