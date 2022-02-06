const { DataTypes } = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  rating: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  review: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  listingOwner: {
    type: DataTypes.UUID,
    allowNull: false,
  }
})

module.exports = Review;