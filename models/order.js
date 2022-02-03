const { DataTypes } = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fulfillmentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  listingOwner: {
    type: DataTypes.UUID,
    allowNull: false
  }
});

module.exports = Order;