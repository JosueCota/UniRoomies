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
            is_smoker: {
                //Whether you smoke
                type: DataTypes.BOOLEAN()
            },
            accomodations: {
                //Accomodations for people with needs
                type: DataTypes.TEXT()
            },
            stay_length: {
                //For how long are they looking for? (1 year, 6 months etc)
                type: DataTypes.STRING(50)
            },
            couples_ok: {
                //Whether user is okay with couples
                type: DataTypes.BOOLEAN()
            },
            pet_owner: {
                //Whether they own a pet
                type: DataTypes.BOOLEAN()
            },
            sleep_schedule: {
                //When they tend to sleep
                type: DataTypes.STRING(50)
            },
            hobbies: {
                //What hobbies they have
                type: DataTypes.TEXT("medium")
            },
            parking_needed: {
                //Whether they need parking
                type: DataTypes.BOOLEAN()
            },
            contacts: {
                //Contacts
                type: DataTypes.TEXT("medium")
            }
        },
        {
            createdAt: false,
            updatedAt: false
        }
    );
};
    
    

