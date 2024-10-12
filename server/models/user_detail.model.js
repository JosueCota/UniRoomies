const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'user_detail', 
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
            study_time: {
                type: DataTypes.STRING(25)
            },
            budget: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            sharing: {
                type: DataTypes.BOOLEAN()
            },
            move_in_date: {
                type: DataTypes.DATEONLY
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING(10),
            },
            location: {
                type: DataTypes.STRING(50)
            }
        },
        {
            createdAt: false,
            updatedAt: false
        }
    );
};
    
    

