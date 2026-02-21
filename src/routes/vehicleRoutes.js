const express = require("express");
const router = express.Router();

const {
  createVehicle,
  getVehicles
} = require("../controllers/vehicleController");

const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

/* ===============================
   PROTECTED ROUTES
================================ */

// Only Admin & Operator can create vehicles
router.post(
  "/",
  authenticate,
  authorize("Admin", "Operator"),
  createVehicle
);

// Any authenticated user can view vehicles
router.get(
  "/",
  authenticate,
  getVehicles
);

module.exports = router;