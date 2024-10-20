const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'User_Detail', 
        {
            id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            roommate_desc: {
                type: DataTypes.TEXT("medium"),
            },
            cities: {
                //Interested in what cities, array, kept in space seperated string
                type: DataTypes.TEXT("medium")
            },
            budget: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            sharing: {
                // Whether they are open to sharing rooms
                type: DataTypes.BOOLEAN()
            },
            move_in_date: {
                //Ready date to move in
                type: DataTypes.DATEONLY
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING(10),
            },
        },
        {
            createdAt: false,
            updatedAt: false
        }
    );
};
    
    

