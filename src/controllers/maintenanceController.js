const { MaintenanceLog, Vehicle, Trip, sequelize } = require("../models");

/* ===============================
   ADD MAINTENANCE (HARDENED)
================================ */
exports.addMaintenance = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { vehicleId, description, cost } = req.body;

    if (!vehicleId || !description || !cost) {
      await transaction.rollback();
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (cost <= 0) {
      await transaction.rollback();
      return res.status(400).json({ error: "Invalid maintenance cost" });
    }

    const vehicle = await Vehicle.findByPk(vehicleId, { transaction });

    if (!vehicle) {
      await transaction.rollback();
      return res.status(404).json({ error: "Vehicle not found" });
    }

    const maintenance = await MaintenanceLog.create({
      vehicleId,
      description,
      cost
    }, { transaction });

    // Attach to active trip only if valid
    const activeTrip = await Trip.findOne({
      where: {
        vehicleId: vehicleId,
        status: "Scheduled"
      },
      transaction
    });

    if (activeTrip) {

      if (activeTrip.status === "Completed" || activeTrip.status === "Cancelled") {
        await transaction.rollback();
        return res.status(400).json({
          error: "Cannot add maintenance to completed/cancelled trip"
        });
      }

      activeTrip.maintenanceCost += cost;
      await activeTrip.save({ transaction });
    }

    await transaction.commit();

    res.status(201).json(maintenance);

  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};