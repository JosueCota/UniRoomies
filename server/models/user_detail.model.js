const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'User_Detail', 
        {
            id : {
                type: DataTypes.INTEGER(),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            roommate_desc: {
                type: DataTypes.TEXT("medium"),
            },
            cities: {
                //Interested in what cities, array, kept in space seperated string
                type: DataTypes.TEXT("medium"),
                allowNull: false
            },
            budget: {
                type: DataTypes.INTEGER(),
                allowNull: false
            },
            room_sharing: {
                // Whether they are open to sharing rooms (Yes/No)
                type: DataTypes.BOOLEAN(),
                allowNull: false
            },
            move_in_date: {
                //Ready date to move in
                type: DataTypes.DATEONLY()
            },
            age: {
                type: DataTypes.INTEGER(),
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            pronouns: {
                //He/Him They/Them She/Her
                type: DataTypes.STRING(25),
            },
            is_smoker: {
                //Whether you smoke
                type: DataTypes.BOOLEAN()
            },
            cooking: {
                //How often they cook at home (1-2 a week) (3-5 a week) (every day)
                type: DataTypes.STRING(50)
            },
            stay_length: {
                //For how long are they looking for? (1 year, 6 months etc)
                type: DataTypes.STRING(50)
            },
            allergies: {
                //Pets? Foods? Might be an array
                type: DataTypes.TEXT()
            },
            couples_ok: {
                //Whether user is okay with couples
                type: DataTypes.BOOLEAN()
            },
            pet_owner: {
                //Whether they own a pet
                type: DataTypes.BOOLEAN()
            },
        },
        {
            createdAt: false,
            updatedAt: false
        }
    );
};
    
    

