const { DataTypes } = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'primary', 'secondary'),
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profileDescription: {
    type: DataTypes.STRING,
    allowNull: true,
  }
})

module.exports = User;