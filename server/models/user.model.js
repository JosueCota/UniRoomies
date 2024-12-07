const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'User',
      {
        id: {
          type: DataTypes.BIGINT(),
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        firstName: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING(50),
          allowNull: false
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        isActive: {
          type: DataTypes.BOOLEAN(),
          defaultValue: false
        },
        isRegistered: {
          type: DataTypes.BOOLEAN(),
          defaultValue: false,
        },
        pfp: {
          type: DataTypes.SMALLINT().UNSIGNED,
          allowNull: false
        },
        socket_id: {
          type: DataTypes.TEXT()
        }
      },
  );
};