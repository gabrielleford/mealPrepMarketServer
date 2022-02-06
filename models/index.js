const db = require('../db');

const User = require('./user');
const Listing = require('./listing');
const Order = require('./order');
// const Review = require('./review');

User.hasMany(Listing, {
  onDelete: 'cascade'
});
User.hasMany(Order, {
  onDelete: 'cascade'
});

Listing.belongsTo(User);
Listing.hasMany(Order, {
  onDelete: 'cascade'
});
Listing.hasMany(Review, {
  onDelete: 'cascade'
})

Order.belongsTo(User);
Order.belongsTo(Listing);

// Review.belongsTo(User);
// Review.belongsTo(Listing);

module.exports = { 
  dbConnection: db,
  User, 
  Listing, 
  Order,
  // Review
};