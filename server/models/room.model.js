const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {  
    sequelize.define(
        'Room', 
        {
            room_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            image: {
                type: DataTypes.STRING(200),
            },
            location: {
                type: DataTypes.STRING(100)
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            amenities: {
                type: DataTypes.TEXT
            },
            description: {
                type: DataTypes.TEXT
            }
        }
    );
};
