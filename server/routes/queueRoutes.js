const express = require("express");

const router = express.Router();

const {
  callNextPatient,
  completeConsultation,
  resetQueue,
} = require("../controllers/queueController");

// Call Next Patient
router.post("/next", callNextPatient);

// Complete Consultation
router.put("/complete", completeConsultation);

// Reset Queue
router.delete("/reset", resetQueue);

module.exports = router;
