const Driver = require("../models/Driver");

// CREATE DRIVER
exports.createDriver = async (req, res) => {
  try {
    const { name, licenseNumber, licenseExpiry, category } = req.body;

    const driver = await Driver.create({
      name,
      licenseNumber,
      licenseExpiry,
      category
    });

    res.status(201).json(driver);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET ALL DRIVERS
exports.getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.findAll();
    res.json(drivers);

  } catch (error) {
  console.log(error);
  res.status(400).json({ error: error.message });
}
};