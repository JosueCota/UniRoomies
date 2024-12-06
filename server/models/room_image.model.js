const { DataTypes } = require('sequelize');

//Part of Room Model
module.exports = (sequelize) => {  
    sequelize.define(
        'Room_Image', 
        {
            images_id: {
                type: DataTypes.BIGINT(),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            image1: {
                type: DataTypes.TEXT(300),
            },
            image2: {
                type: DataTypes.TEXT(300),
            },
            image3: {
                type: DataTypes.TEXT(300),
            },
            image4: {
                type: DataTypes.TEXT(300),
            },
            image5: {
                type: DataTypes.TEXT(300),
            },
        },
        {
            createdAt: false,
            updatedAt: false
        }
    );
};