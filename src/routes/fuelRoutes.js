const express = require("express");
const router = express.Router();

const { addFuel } = require("../controllers/fuelController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.post(
  "/",
  authenticate,
  authorize("Admin", "Operator"),
  addFuel
);

module.exports = router;