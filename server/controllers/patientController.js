const Patient = require("../models/patient");
// Add Patient
const addPatient = async (req, res) => {

  try {

    const {
      name,
      phone,
    } = req.body;

    if (!name || !phone) {

      return res.status(400).json({
        message:
          "Patient name and phone number are required",
      });

    }

    const lastPatient =
      await Patient.findOne()
        .sort({ token: -1 });

    const nextToken =
      lastPatient
        ? lastPatient.token + 1
        : 1;

    const patient =
      await Patient.create({

        name,
        phone,
        token: nextToken,

      });

    res.status(201).json(patient);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

// Get All Patients

const getPatients = async (req, res) => {

  try {

    const patients =
      await Patient.find()
        .sort({ token: 1 });

    res.status(200).json(
      patients
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
// Update Patient Status

const updatePatientStatus = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const { status } =
      req.body;

    const patient =
      await Patient.findByIdAndUpdate(
        id,
        {
          status,
        },
        {
          new: true,
        }
      );

    if (!patient) {

      return res.status(404).json({
        message:
          "Patient not found",
      });

    }

    res.status(200).json(
      patient
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// Update Patient Details

const updatePatientName = async (
  req,
  res
) => {

  try {

    const { id } =
      req.params;

    const {
      name,
      phone,
    } = req.body;

    const patient =
      await Patient.findByIdAndUpdate(
        id,
        {
          name,
          phone,
        },
        {
          new: true,
        }
      );

    if (!patient) {

      return res.status(404).json({
        message:
          "Patient not found",
      });

    }

    res.status(200).json(
      patient
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// Rejoin Queue

const rejoinQueue = async (req, res) => {

  try {

    const { id } = req.params;

    const patient =
      await Patient.findById(id);

    if (!patient) {

      return res.status(404).json({
        message: "Patient not found",
      });

    }

    const lastPatient =
      await Patient.findOne()
        .sort({ token: -1 });

    patient.token = lastPatient.token + 1;

    patient.status = "waiting";

    await patient.save();

    res.status(200).json({
      message: "Patient rejoined successfully",
      patient,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {

  addPatient,
  getPatients,
  updatePatientStatus,
  updatePatientName,
  rejoinQueue,

};
