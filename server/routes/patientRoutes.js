const express = require("express");

const router = express.Router();

const {
  addPatient,
  getPatients,
  updatePatientStatus,
  updatePatientName,
  rejoinQueue,
} = require("../controllers/patientController");

const {
  getPatientStatus,
} = require("../controllers/patientStatusController");

// Add Patient

router.post("/", addPatient);
// Get All Patients
router.get("/", getPatients);
// Get Patient Status
router.get(
  "/status/:token",
  getPatientStatus
);

// Edit Patient

router.put(
  "/edit/:id",
  updatePatientName
);

// Rejoin Queue

router.put(
  "/rejoin/:id",
  rejoinQueue
);

// Update Patient Status
router.put(
  "/:id",
  updatePatientStatus
);

module.exports = router;