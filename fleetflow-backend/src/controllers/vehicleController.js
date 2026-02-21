const Vehicle = require("../models/Vehicle");

// CREATE VEHICLE
exports.createVehicle = async (req, res) => {
  try {
    const { registrationNumber, type, capacity } = req.body;

    const vehicle = await Vehicle.create({
      registrationNumber,
      type,
      capacity
    });

    res.status(201).json(vehicle);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET ALL VEHICLES
exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.json(vehicles);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};