const express = require("express");

const router =
  express.Router();

const {
  getSettings,
  updateAvgTime,
} = require(
  "../controllers/settingsController"
);

router.get("/", getSettings);

router.put("/", updateAvgTime);

module.exports = router;
