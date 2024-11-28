const db  = require("../database.js");
const asyncHandler = require("express-async-handler")
const { s3Upload, s3RemoveImages } = require("../s3Service");

const Room = db.models.Room;
const User = db.models.User;
const RoomImage = db.models.Room_Image;

//Creates or Update Room 
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

//Updates both s3 bucket and database 
const updateRoomImages = asyncHandler(async (req, res) => {
    let image = await RoomImage.findOne({
        where: {RoomId: req.room},
        attributes: {exclude: ["images_id", "RoomId"]}
    })

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

        const keys = Object.values(image.dataValues)

        await s3RemoveImages(path="roomImages" ,keys);

        Object.assign(image, images);
        await image.save()

        res.status(200).json({message: "Room Updated"})
    }
})

//Gets all rooms
const getRooms = asyncHandler(async (req, res) => {
    //Show room based off req.body.id

    const {count, rows:rooms} = await User.findAndCountAll(
        {
            where: {
                id: req.user.id,
            },
            attributes: ["firstName", "lastName", "id"], 
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

    //Transforms each first image of every room into the correct public URL
    for (let i=0; i < rooms.length;i++) {
        rooms[i].Rooms[0][`Room_Image`].image1 = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/roomImages/${rooms[i].Rooms[0]['Room_Image'].image1}`
        
    }
    
    res.status(200).json({rooms, count})
    // const urls = params.map(param => {
    //     return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${param.Key}`
    // })
});

//Returns room based on Room_Id
const getRoom = asyncHandler(async (req, res) => {
    //Show rooms
    const id = req.params.id || null;

    //If pagination, might need to grab 10, then do 10(n)-9 - 10(n)
});

//Deletes Room (Room Images by cascade) and room images for s3 bucket
const deleteRoom = asyncHandler(async (req, res) => {
    const id = req.user.id;
    console.log(id)
    const room = await Room.findOne({        
        where: {
            UserId: id,
        },
        include: [{
            model:RoomImage,
            attributes: {
                exclude:["images_id", "RoomId"]
                
            }
        }]
    });
    const keys = Object.values(room["Room_Image"].dataValues)

    await s3RemoveImages("roomImages", keys)
    await room.destroy()


    res.status(200).json(room)
});

module.exports = {
    createRoom,
    getRooms,
    getRoom,
    updateRoomImages,
    deleteRoom
}