// routes/atenea.js
const express = require("express");
const router = express.Router();
const {
  welcome,
  history,
  nextSteps,
} = require("../controllers/ateneaController");

router.get("/welcome", welcome);
router.get("/history", history);
router.get("/next-steps", nextSteps);

module.exports = router;
