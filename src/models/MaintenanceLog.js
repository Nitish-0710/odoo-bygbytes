const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const MaintenanceLog = sequelize.define("MaintenanceLog", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  vehicleId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  description: {
    type: DataTypes.STRING,
    allowNull: false
  },

  cost: {
    type: DataTypes.FLOAT,
    allowNull: false
  }

}, {
  timestamps: true
});

module.exports = MaintenanceLog;