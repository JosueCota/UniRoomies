const { DataTypes } = require('sequelize');

//Part of Chat Model and User Model
module.exports = (sequelize) => {  
    sequelize.define(
        'Chat_Participant', 
        {
            id : {
                type: DataTypes.BIGINT(),
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            chat_id: {
                type: DataTypes.BIGINT(),
                allowNull: false
            },
            user_id: {
                type: DataTypes.BIGINT(),
                allowNull: false    
            },
            hidden: {
                type: DataTypes.BOOLEAN(),
                defaultValue: false,
            }, 
            seen: {
                type: DataTypes.BOOLEAN(),
                defaultValue: true,
            }
        },
    );
};