const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Trip = sequelize.define("Trip", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  origin: {
    type: DataTypes.STRING,
    allowNull: false
  },

  destination: {
    type: DataTypes.STRING,
    allowNull: false
  },

  revenue: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 1
    }
  },

  fuelCost: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },

  maintenanceCost: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },

  profit: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "Scheduled",
    validate: {
      isIn: [["Scheduled", "InProgress", "Completed", "Cancelled"]]
    }
  }

}, {
  timestamps: true
});

/* ===============================
   PROTECT PROFIT FROM MANUAL EDIT
================================ */
Trip.addHook("beforeUpdate", (trip) => {
  if (trip.changed("profit") && trip.status !== "Completed") {
    throw new Error("Profit can only be updated on trip completion");
  }
});

module.exports = Trip;