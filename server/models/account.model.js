const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Account',
      {
        registrationCode: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        isActive: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        isRegistered: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          default: false
        },
      }, 
  );
};
