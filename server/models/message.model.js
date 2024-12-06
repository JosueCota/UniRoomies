const { DataTypes } = require('sequelize');

//Part of Room Model
module.exports = (sequelize) => {  
    sequelize.define(
        'Message', 
        {
            message_id: {
                type: DataTypes.BIGINT(),
                primaryKey: true,
                allowNull: false
            },
            sender_id: {
                type: DataTypes.BIGINT(),
                allowNull: false
            },
            message: {
                type: DataTypes.TEXT("medium"),
                allowNull: false
            },
            chat_id: {
                type: DataTypes.BIGINT(),
                allowNull: false
            }
        },
    );
};