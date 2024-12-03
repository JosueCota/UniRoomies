const db  = require("../database.js");
const asyncHandler = require("express-async-handler")
const { s3Upload, s3RemoveImages } = require("../s3Service");
const { Op } = require("sequelize");

const Room = db.models.Room;
const User = db.models.User;
const RoomImage = db.models.Room_Image;

//Creates or Update Room 
const createRoom = asyncHandler(async (req, res, next) => {
    
    console.log(req.body)
    const newRoomParam = {
        UserId: req.user.id,
        location: req.body.location,
        price: req.body.price,
        current_household: req.body.current_household,
        sharing: req.body.sharing,
        date_available: req.body.date_available,
        description: req.body.description || null,
        amenities: req.body.amenities || null,
        pets: req.body.pets || null,
        utilities_included: req.body.utility_included || null,
        size: req.body.size || null,
        furnished: req.body.furnished || null,
        places_near: req.body.places_near || null,
        parking_space: req.body.parking_space || null,
    }
    
    const room = await Room.findOne({where: {UserId: req.user.id}});

    if (!room) {
        //Create a room for user
        const user = await User.findByPk(req.user.id);
        const newRoom = await Room.create(newRoomParam);
        
        user.setRoom(newRoom);
 
        req.room = newRoom.room_id;
        next()

    } else {
        //Update room
        Object.assign(room, req.body);
        await room.save()
        req.room = room.room_id;
        next()
    }
});

//Updates both s3 bucket and database 
const updateRoomImages = asyncHandler(async (req, res) => {
    const image = await RoomImage.findOne({
        where: {RoomId: req.room},
    })

    let images = {
        images_id: null,
        RoomId: req.room
    }

    //Upload Images to s3 bucket
    const results = await s3Upload(req.files, "roomImages")
    //Store keys in table properties
    for (let i=0; i<5; i++){
        images[`image${i+1}`] = results[i] || null;
    }

    if (!image) {
        const room = await Room.findByPk(req.room)
        const newImg = await RoomImage.create(images)

        room.setRoom_Image(newImg);

        res.status(200).json({message: "Room Created"})   
    } else {
        //Remove previous images when updating
        const keys = Object.values(image.dataValues)
        await s3RemoveImages(path="roomImages" ,keys);

        Object.assign(image, images);
        await image.save()

        res.status(200).json({message: "Room Updated"})
    }
})

//Gets all rooms
const getRooms = asyncHandler(async (req, res) => {

    if (!req.params.offset) {
        res.status(404);
        throw new Error("No Offset Found")
    }

    var whereClause = {}
    if (req.params.location!=="none" && req.params.price) {
        whereClause = {
            [Op.and]: [
            {
                location: { [Op.substring]: req.params.location }
            },
            {
                price: { [Op.lte]: parseInt(req.params.price) }
            }
        ]}
    } else if ((req.params.location!=="none" || !req.params.location) && !req.params.price){
        whereClause = {
            location: {
                [Op.substring]: req.params.location                 
            }
        }
    } else if (req.params.price && (req.params.location=="none" || !req.params.location)) {
        whereClause = {            
            price: {
                [Op.lte]: parseInt(req.params.price)
            } 
        }
    }

    const offset = (req.params.offset-1)* 10;

    const {count, rows:rooms} = await Room.findAndCountAll(
        {
            where: whereClause,
            attributes: ["location", "price", "date_available", "sharing"],
            order: [
                ["updatedAt", "DESC"]
            ],
            include: [
                {
                    model: User,
                    attributes: ["firstName", "lastName", "id"], 
                    where: {isActive : true },
                },
                {
                    model: RoomImage,
                    attributes:["image1"],
                }    
            ],
            limit: 10,
            offset: offset,
        })  

    //Transforms each first image of every room into the correct public URL
    for (let i=0; i < rooms.length;i++) {
        rooms[i]["Room_Image"].image1 = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/roomImages/${rooms[i]["Room_Image"].image1}`
    }  
    
    res.status(200).json({rooms, count})
    
});

//Returns room based on Room_Id
const getRoom = asyncHandler(async (req, res) => {
    //Show rooms
    const id = req.params.id;

    const userRoom = await User.findByPk(id, {
        attributes: ["id", "firstName", "lastName"],
        include: [
            {
                model: Room,
                attributes: {
                    exclude: ["UserId", "room_id"]
                },
                include: [{
                    model: RoomImage,
                    attributes: {exclude: ["RoomId", "images_id"]}
                }]

            }
        ],
    });

    if (!userRoom || !userRoom.Room) {
        res.status(404)
        throw new Error("User has no Room");

    }
    
    let images =  Object.values(userRoom.Room["Room_Image"].dataValues)
    images = images.filter(image => image !== null).map(image => {
        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/roomImages/${image}`
    })

    res.status(200).json({room: userRoom, images: images})
});

//Deletes Room (Room Images by cascade) and room images for s3 bucket
const deleteRoom = asyncHandler(async (req, res) => {
    const id = req.user.id;
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

    res.status(200).json({message: "Deleted Room"})
});

module.exports = {
    createRoom,
    getRooms,
    getRoom,
    updateRoomImages,
    deleteRoom
}