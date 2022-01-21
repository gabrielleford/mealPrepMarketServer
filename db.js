const { Sequelize } = require("sequelize");

const db = new Sequelize(
  `postgresql://postgres:${encodeURIComponent(process.env.PASS)}@localhost/mealprepmarket`
)

module.exports = db;