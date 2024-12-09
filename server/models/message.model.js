const { DataTypes } = require('sequelize');
const { encrypt, decryption } = require('../helpers/encryption');

//Part of Chat Model
module.exports = (sequelize) => {  
    sequelize.define(
        'Message', 
        {
            message_id: {
                type: DataTypes.BIGINT(),
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            sender_id: {
                type: DataTypes.BIGINT(),
                allowNull: false
            },
            message: {
                type: DataTypes.TEXT("medium"),
                allowNull: false,
                get() {
                    const decrypted = decryption(this.getDataValue("message"));
                    return decrypted
                },
                set(val) {
                    const enc = encrypt(val);
                    this.setDataValue("message", enc);
                }
            },
            chat_id: {
                type: DataTypes.BIGINT(),
                allowNull: false
            }
        },
    );
};