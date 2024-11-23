const sequelize  = require("../database.js");
const User = sequelize.models.User;
const UserDetail = sequelize.models.User_Detail;
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");

//Requires offset value, checks for location or/and budget params
const getRoommates = asyncHandler(async (req, res) => {
    
    // if req.body.budget or req.body.location do query based on that
    // for pagination, also expects a offsetNum (page number) (offset-1)*10
    // for pagination, need count

    if (!req.params.offset) {
        res.status(404);
        throw new Error("No Offset Found")
    }

    let whereClause = {}
    if (req.params.location!=="none" && req.params.budget) {
        whereClause = {
            [Op.and]: [
            {
                cities: { [Op.substring]: req.params.location }
            },
            {
                budget: { [Op.lte]: parseInt(req.params.budget) }
            }
        ]}
    } else if (req.params.location!=="none" && !req.params.budget){
        whereClause = {
            cities: {
                [Op.substring]: req.params.location                 
            }
        }
    } else if (req.params.budget && req.params.location=="none") {
        whereClause = {            
            budget: {
                [Op.lte]: parseInt(req.params.budget)
            } 
        }
    }

    const offset = (req.params.offset-1)* 10;


    // TODO: FIX ORDERING WHEN I RESET DB TO MATCH NEW MODEL

    const {count, rows:users} = await User.findAndCountAll({
        attributes: ["id", "firstName", "lastName", "pfp"],
        include: [
            {
                model: UserDetail,
                attributes: [
                    "age", "gender", "budget", "cities", "room_sharing", "updatedAt"
                ],
                where: whereClause
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
        offset: offset,
        order: [
            ["updatedAt", "DESC"]
        ]
    });

    if (!users) {
        res.status(404);
        throw new Error("No Users Found")
    }

    res.status(200).json({users: users, count: count })
});

// Based On Id, return all details and select user attributes
const getRoommate = asyncHandler(async (req, res) => {
    const id = req.params.id || null;
    
    if (!id) {
        res.status(400);
        throw new Error("No Parameter Passed!")
    }

    const user = await User.findByPk(id, {
        where: {
            isActive: true,
        },
        attributes: ["id", "firstName", "lastName", "pfp"],
        include: [
            {
                model: UserDetail,
                attributes: {
                    exclude: ["UserId", "id"]
                }
            }
        ],
    });
    

    if (!user) {
        res.status(404);
        throw new Error("No User Found")
    }

    res.status(200).json({user})

});

module.exports= {
    getRoommates,
    getRoommate
}