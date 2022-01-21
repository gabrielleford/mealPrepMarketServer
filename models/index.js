const db = require('../db');

const User = require('./user');
const Listing = require('./listing');
const Order = require('./order');

User.hasMany(Listing, {
  onDelete: 'cascade'
});
User.hasMany(Order, {
  onDelete: 'cascade'
});

Listing.belongsTo(User);
Listing.hasMany(Order);

Order.belongsTo(User);
Order.belongsTo(Listing);

module.exports = { 
  dbConnection: db,
  User, 
  Listing, 
  Order 
};