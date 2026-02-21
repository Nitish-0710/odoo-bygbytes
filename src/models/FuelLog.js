const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const FuelLog = sequelize.define("FuelLog", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  tripId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  liters: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  costPerLiter: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  totalCost: {
    type: DataTypes.FLOAT,
    allowNull: false
  }

}, {
  timestamps: true
});

module.exports = FuelLog;