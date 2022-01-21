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

Order.belongsTo(User);
Order.belongsTo(Listing);

module.exports = { User, Listing, Order };