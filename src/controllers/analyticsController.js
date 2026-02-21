const { Trip } = require("../models");
const { Sequelize } = require("sequelize");

exports.getFinancialSummary = async (req, res) => {
  try {
    const summary = await Trip.findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("revenue")), "totalRevenue"],
        [Sequelize.fn("SUM", Sequelize.col("fuelCost")), "totalFuelCost"],
        [Sequelize.fn("SUM", Sequelize.col("maintenanceCost")), "totalMaintenanceCost"],
        [Sequelize.fn("SUM", Sequelize.col("profit")), "totalProfit"]
      ],
      where: {
        status: "Completed"
      }
    });

    res.json(summary[0]);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};