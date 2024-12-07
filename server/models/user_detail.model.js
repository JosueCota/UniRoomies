const { DataTypes } = require('sequelize');

//Part of User
module.exports = (sequelize) => {
    sequelize.define(
        'User_Detail', 
        {
            id : {
                type: DataTypes.BIGINT(),
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
                allowNull: false,
                get() {
                    return this.getDataValue("cities").split("|")
                },
                set(val) {
                    this.setDataValue("cities", val.join("|"));
                }
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
                type: DataTypes.DATEONLY(), 
                allowNull: false
            },
            age: {
                type: DataTypes.SMALLINT().UNSIGNED,
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            is_smoker: {
                //Whether you smoke
                type: DataTypes.BOOLEAN()
            },
            accomodations: {
                //Accomodations for people who need them
                type: DataTypes.TEXT("medium"),
                get() {
                    if (this.getDataValue("accomodations")){
                        return this.getDataValue("accomodations").split("|")
                    }
                },
                set(val) {
                    val?this.setDataValue("accomodations", val.join("|")): this.setDataValue("accomodations", null);
                }
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
                type: DataTypes.TEXT("medium"),
                get() {
                    if (this.getDataValue("hobbies")){
                        return this.getDataValue("hobbies").split("|")
                    } 
                },
                set(val) {
                    val? this.setDataValue("hobbies", val.join("|")): this.setDataValue("hobbies", null);
                }
            },
            living_preferences: {
                //What preferences do they have?
                type: DataTypes.TEXT("medium"),
                get() {
                    if (this.getDataValue("living_preferences")){
                        return this.getDataValue("living_preferences").split("|")
                    } 
                },
                set(val) {
                    val? this.setDataValue("living_preferences", val.join("|")): this.setDataValue("living_preferences", null);
                }
            },
            parking_needed: {
                //Whether they need parking
                type: DataTypes.BOOLEAN()
            },
            university: {
                //What school they are from
                type: DataTypes.STRING(100)
            },
            contacts: {
                //Contacts
                type: DataTypes.TEXT("medium"),
                get() {
                    if (this.getDataValue("contacts")){
                        return this.getDataValue("contacts").split("|")
                    }
                },
                set(val) {
                    val? this.setDataValue("contacts", val.join("|")): this.setDataValue("contacts", null);
                }
            }
        },
    );
};
    
    

