const express = require("express");

const router = express.Router();

const {
  callNextPatient,
} = require("../controllers/queueController");

router.post("/next", callNextPatient);

module.exports = router;
