const { Trip, Driver, Vehicle, sequelize } = require("../models");
const { checkDriverValidity } = require("../utils/stateMachine");

/* ===============================
   CREATE TRIP (TRANSACTION SAFE)
================================ */
exports.createTrip = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { origin, destination, vehicleId, driverId, revenue } = req.body;

    if (!revenue || revenue <= 0) {
      await transaction.rollback();
      return res.status(400).json({ error: "Invalid revenue value" });
    }

    const driver = await Driver.findByPk(driverId, { transaction });
    const vehicle = await Vehicle.findByPk(vehicleId, { transaction });

    if (!driver || !vehicle) {
      await transaction.rollback();
      return res.status(404).json({ error: "Driver or Vehicle not found" });
    }

    if (vehicle.status !== "Available") {
      await transaction.rollback();
      return res.status(400).json({ error: "Vehicle not available" });
    }

    if (driver.status !== "OnDuty") {
      await transaction.rollback();
      return res.status(400).json({ error: "Driver not available" });
    }

    const validity = checkDriverValidity(driver);
    if (!validity.valid) {
      await transaction.rollback();
      return res.status(400).json({ error: validity.reason });
    }

    const trip = await Trip.create({
      origin,
      destination,
      vehicleId,
      driverId,
      revenue,
      status: "Scheduled"
    }, { transaction });

    vehicle.status = "OnTrip";
    await vehicle.save({ transaction });

    driver.status = "OffDuty";
    await driver.save({ transaction });

    await transaction.commit();

    res.status(201).json(trip);

  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};

/* ===============================
   COMPLETE TRIP
================================ */
exports.completeTrip = async (req, res) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findByPk(id);
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    if (trip.status === "Completed") {
      return res.status(400).json({ error: "Trip already completed" });
    }

    if (trip.status !== "Scheduled" && trip.status !== "InProgress") {
      return res.status(400).json({ error: "Trip cannot be completed" });
    }

    trip.status = "Completed";
    trip.profit = trip.revenue - trip.fuelCost - trip.maintenanceCost;

    await trip.save();

    const vehicle = await Vehicle.findByPk(trip.vehicleId);
    const driver = await Driver.findByPk(trip.driverId);

    vehicle.status = "Available";
    await vehicle.save();

    driver.status = "OnDuty";
    await driver.save();

    res.json({ message: "Trip completed successfully", trip });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ===============================
   CANCEL TRIP
================================ */
exports.cancelTrip = async (req, res) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findByPk(id);
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    if (trip.status !== "Scheduled") {
      return res.status(400).json({
        error: "Only scheduled trips can be cancelled"
      });
    }

    trip.status = "Cancelled";
    await trip.save();

    const vehicle = await Vehicle.findByPk(trip.vehicleId);
    const driver = await Driver.findByPk(trip.driverId);

    vehicle.status = "Available";
    await vehicle.save();

    driver.status = "OnDuty";
    await driver.save();

    res.json({ message: "Trip cancelled successfully", trip });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ===============================
   GET ALL TRIPS
================================ */
exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll({
      include: [Driver, Vehicle]
    });

    res.json(trips);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};