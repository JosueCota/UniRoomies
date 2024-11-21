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
            image: {
                type: DataTypes.STRING(200),
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
            amenities: {
                //What does the property offer
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
            description: {
                type: DataTypes.TEXT()
            },
            current_household: {
                type: DataTypes.TEXT(),
                allowNull: false
            }
        }
    );
};
