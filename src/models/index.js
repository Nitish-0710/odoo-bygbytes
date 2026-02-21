const sequelize = require("../config/db");

const Vehicle = require("./Vehicle");
const Driver = require("./Driver");
const Trip = require("./Trip");
const FuelLog = require("./FuelLog");
const MaintenanceLog = require("./MaintenanceLog");
const User = require("./User");

Vehicle.hasMany(Trip, { foreignKey: "vehicleId" });
Driver.hasMany(Trip, { foreignKey: "driverId" });

Trip.belongsTo(Vehicle, { foreignKey: "vehicleId" });
Trip.belongsTo(Driver, { foreignKey: "driverId" });

Trip.hasMany(FuelLog, { foreignKey: "tripId" });
FuelLog.belongsTo(Trip, { foreignKey: "tripId" });

Vehicle.hasMany(MaintenanceLog, { foreignKey: "vehicleId" });
MaintenanceLog.belongsTo(Vehicle, { foreignKey: "vehicleId" });

module.exports = {
  sequelize,
  Vehicle,
  Driver,
  Trip,
  FuelLog,
  MaintenanceLog,
  User
};