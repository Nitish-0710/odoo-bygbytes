const express = require("express");
const router = express.Router();

const {
  createTrip,
  completeTrip,
  cancelTrip,
  getTrips
} = require("../controllers/tripController");

const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// READ allowed for all authenticated users
router.get("/", authenticate, getTrips);

// DISPATCH restricted
router.post(
  "/",
  authenticate,
  authorize("Admin", "Operator"),
  createTrip
);

// COMPLETE restricted
router.put(
  "/:id/complete",
  authenticate,
  authorize("Admin", "Operator"),
  completeTrip
);

// CANCEL restricted
router.put(
  "/:id/cancel",
  authenticate,
  authorize("Admin", "Operator"),
  cancelTrip
);

module.exports = router;