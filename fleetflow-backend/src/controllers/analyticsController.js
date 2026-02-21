const { Trip } = require("../models");
const { Sequelize } = require("sequelize");

exports.getFinancialSummary = async (req, res) => {
  try {
    const summary = await Trip.findOne({
      attributes: [
        [Sequelize.fn("COALESCE", Sequelize.fn("SUM", Sequelize.col("revenue")), 0), "totalRevenue"],
        [Sequelize.fn("COALESCE", Sequelize.fn("SUM", Sequelize.col("fuelCost")), 0), "totalFuelCost"],
        [Sequelize.fn("COALESCE", Sequelize.fn("SUM", Sequelize.col("maintenanceCost")), 0), "totalMaintenanceCost"],
        [Sequelize.fn("COALESCE", Sequelize.fn("SUM", Sequelize.col("profit")), 0), "totalProfit"]
      ],
      raw: true
    });

    res.json(summary);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};