const express = require("express");
const router = express.Router();

const { addMaintenance, getMaintenance } = require("../controllers/maintenanceController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.get("/", authenticate, authorize("Admin", "Operator"), getMaintenance);
router.post("/", authenticate, authorize("Admin", "Operator"), addMaintenance);

module.exports = router;