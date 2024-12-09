const { DataTypes } = require('sequelize');

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