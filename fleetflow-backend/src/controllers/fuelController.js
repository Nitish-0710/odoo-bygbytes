const { FuelLog, Trip, sequelize } = require("../models");

exports.addFuel = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { tripId, liters, costPerLiter } = req.body;

    if (!tripId || !liters || !costPerLiter) {
      await transaction.rollback();
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (liters <= 0 || costPerLiter <= 0) {
      await transaction.rollback();
      return res.status(400).json({ error: "Invalid fuel values" });
    }

    const trip = await Trip.findByPk(tripId, { transaction });

    if (!trip) {
      await transaction.rollback();
      return res.status(404).json({ error: "Trip not found" });
    }

    if (trip.status === "Completed" || trip.status === "Cancelled") {
      await transaction.rollback();
      return res.status(400).json({
        error: "Cannot add fuel to completed or cancelled trip",
      });
    }

    const totalCost = liters * costPerLiter;

    const fuelLog = await FuelLog.create(
      {
        tripId,
        liters,
        costPerLiter,
        totalCost: totalCost,
      },
      { transaction },
    );

    // 🔥 SAFE FIX HERE
    trip.fuelCost = (trip.fuelCost || 0) + totalCost;

    await trip.save({ transaction });

    await transaction.commit();

    res.status(201).json(fuelLog);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};
