const { DataTypes } = require('sequelize');

//Part of Room Model
module.exports = (sequelize) => {  
    sequelize.define(
        'Chat', 
        {
            chat_id: {
                type: DataTypes.BIGINT(),
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
        },
    );
};