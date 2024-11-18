const sequelize  = require("../database.js");
const User = sequelize.models.User
const UserDetail = sequelize.models.User_Detail
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize")

const getRoommates = asyncHandler(async (req, res) => {
    
    // if req.body.budget or req.body.location do query based on that
    // for pagination, also expects a offsetNum (page number) (offset-1)*10
    // for pagination, need count
    
    if (!req.params.offset) {
        res.status(404);
        throw new Error("No Offset Found")
    }

    const offset = (req.params.offset-1)* 10

    const {count, rows} = await User.findAndCountAll({
        attributes: ["id", "firstName", "lastName", "pfp"],
        include: [
            {
                model: UserDetail,
                attributes: [
                    "age", "gender", "budget", "cities", "room_sharing"
                ],
            }
        ],
        where: {
            isActive: true,
            [Op.not]: [
                {id: req.user.id}
            ]
        },
        order: [
            ["updatedAt"]
        ],
        limit: 10,
        // offset: offset
    })
    
    console.log(rows)
    console.log(count)

    if (!rows) {
        res.status(404);
        throw new Error("No Users Found")
    }

    res.status(200).json({users: rows, count: count })
});

// Based On Id, return all details and select user attributes
const getRoommate = asyncHandler(async (req, res) => {
    
    const { id } = req.params 

    const user = await User.findOne({
        where: {
            id: id,
            isActive: true,
        },
        attributes: ["id", "firstName", "lastName"],
        include: [
            {
                model: UserDetail,
                attributes: {
                    exclude: ["UserId", "id"]
                }
            }
        ],
    })
    
    console.log(id)

    if (!user) {
        res.status(404)
        throw new Error("No User Found")
    }

    res.status(200).json(user)

})

module.exports= {
    getRoommates,
    getRoommate
}