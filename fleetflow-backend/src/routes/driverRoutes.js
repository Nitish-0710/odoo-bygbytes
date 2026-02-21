const express = require("express");
const router = express.Router();

const { createDriver, getDrivers } = require("../controllers/driverController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// READ allowed for all authenticated users
router.get("/", authenticate, getDrivers);

// WRITE restricted
router.post(
  "/",
  authenticate,
  authorize("Admin", "Operator"),
  createDriver
);

module.exports = router;