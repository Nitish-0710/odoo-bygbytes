const express = require("express");
const router = express.Router();

const { addMaintenance } = require("../controllers/maintenanceController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.post(
  "/",
  authenticate,
  authorize("Admin", "Operator"),
  addMaintenance
);

module.exports = router;