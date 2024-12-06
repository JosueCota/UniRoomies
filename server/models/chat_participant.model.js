const { DataTypes } = require('sequelize');

//Part of Room Model
module.exports = (sequelize) => {  
    sequelize.define(
        'Chat_Participant', 
        {
            id : {
                type: DataTypes.BIGINT(),
                primaryKey: true,
                allowNull: false

            },
            chat_id: {
                type: DataTypes.BIGINT(),
                allowNull: false
            },
            user_id: {
                type: DataTypes.BIGINT(),
                allowNull: false    
            }
        },
    );
};