const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "fleetflow.sqlite", // DB file in backend root
  logging: false
});

module.exports = sequelize;