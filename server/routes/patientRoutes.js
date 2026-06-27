const express = require("express");

const router = express.Router();

const {
  addPatient,
  getPatients,
  updatePatientStatus,
  updatePatientName,
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

// Edit Patient Name
router.put(
  "/edit/:id",
  updatePatientName
);

// Update Patient Status
router.put(
  "/:id",
  updatePatientStatus
);

module.exports = router;
