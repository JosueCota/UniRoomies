const { DataTypes } = require('sequelize');

//Part of User
module.exports = (sequelize) => {  
    sequelize.define(
        'Room', 
        {
            room_id: {
                type: DataTypes.INTEGER(),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            location: {
                //General Location (city)
                type: DataTypes.STRING(100),
                allowNull: false
            },
            price: {
                type: DataTypes.FLOAT(),
                allowNull: false
            },
            current_household: {
                //How many people are in current house
                type: DataTypes.TEXT(),
                allowNull: false
            },
            date_available: {
                type: DataTypes.DATEONLY(),
                allowNull: false
            },
            sharing: {
                //Whether the room is private, has a private bathroom, two private, both shared
                type: DataTypes.TEXT("medium"),
                allowNull: false
            },
            parking_space: {
                //Are there parking spaces available
                type: DataTypes.BOOLEAN()
            },
            amenities: {
                //What amenities does the property offer
                type: DataTypes.TEXT(),
                get() {
                    if (this.getDataValue("amenities")){
                        return this.getDataValue("amenities").split("|")
                    } 
                },
                set(val) {
                    val? this.setDataValue("amenities", val.join("|")): this.setDataValue("amenities", null);
                }
            },
            places_near: {
                //What places are nearby
                type: DataTypes.TEXT(),
                get() {
                    if (this.getDataValue("places_near")){
                        return this.getDataValue("places_near").split("|")
                    } 
                },
                set(val) {
                    val? this.setDataValue("places_near", val.join("|")): this.setDataValue("places_near", null);
                }
            },
            description: {
                type: DataTypes.TEXT()
            },
            size: {
                //Size of room
                type: DataTypes.TEXT("tiny")
            },
            utility_included: {
                type: DataTypes.BOOLEAN()
            },
            pets: {
                type: DataTypes.BOOLEAN()
            },
            furnished: {
                type: DataTypes.BOOLEAN()
            }
        }
    );
};
