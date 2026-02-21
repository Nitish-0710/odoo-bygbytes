const express = require("express");
const router = express.Router();

const { getFinancialSummary } = require("../controllers/analyticsController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.get(
  "/summary",
  authenticate,
  authorize("Admin"),
  getFinancialSummary
);

module.exports = router;