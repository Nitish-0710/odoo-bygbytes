const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Vehicle = sequelize.define("Vehicle", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  registrationNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["Truck", "Van", "Car", "Bike"]]
    }
  },

  capacity: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0
    }
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "Available",
    validate: {
      isIn: [["Available", "OnTrip", "Maintenance"]]
    }
  }

}, {
  timestamps: true
});
Vehicle.associate = (models) => {
  Vehicle.hasMany(models.Trip, { foreignKey: "vehicleId" });
};
module.exports = Vehicle;