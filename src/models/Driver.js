const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Driver = sequelize.define("Driver", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  licenseNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  licenseExpiry: {
    type: DataTypes.DATE,
    allowNull: false
  },

  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["Heavy", "Light"]]
    }
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "OnDuty",
    validate: {
      isIn: [["OnDuty", "OffDuty", "Suspended"]]
    }
  }

}, {
  timestamps: true
});
Driver.addHook("beforeSave", (driver) => {
  const today = new Date();
  const expiry = new Date(driver.licenseExpiry);

  if (expiry < today) {
    driver.status = "Suspended";
  }
});
Driver.associate = (models) => {
  Driver.hasMany(models.Trip, { foreignKey: "driverId" });
};
module.exports = Driver;