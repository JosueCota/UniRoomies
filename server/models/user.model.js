const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'User',
      {
        id: {
          type: DataTypes.INTEGER,
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
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true
          
        },
        password: {
          type: DataTypes.STRING(250),
          allowNull: false
        },
        isActive: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
          defaultValue: true
        }
      },
      {
        createdAt: false,
        updatedAt: false
      }
  );
};

  
