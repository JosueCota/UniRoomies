const { DataTypes } = require('sequelize');

//Part of Room Model
module.exports = (sequelize) => {  
    sequelize.define(
        'Room_Image', 
        {
            images_id: {
                type: DataTypes.INTEGER(),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            image1: {
                type: DataTypes.TEXT("medium"),
            },
            image2: {
                type: DataTypes.TEXT("medium"),
            },
            image3: {
                type: DataTypes.TEXT("medium"),
            },
            image4: {
                type: DataTypes.TEXT("medium"),
            },
            image5: {
                type: DataTypes.TEXT("medium"),
            },
        },
        {
            createdAt: false,
            updatedAt: false
        }
    );
};