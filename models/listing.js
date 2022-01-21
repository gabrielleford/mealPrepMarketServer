const { DataTypes } = require('sequelize');
const db = require('../db');

const Listing = db.define('listing', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})

module.exports = Listing;