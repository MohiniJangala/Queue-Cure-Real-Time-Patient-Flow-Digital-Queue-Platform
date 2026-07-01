const Settings = require("../models/Settings");
const Patient = require("../models/patient");

// Call Next Patient

const callNextPatient = async (req, res) => {
  try {

    const settings = await Settings.findOne();

    if (!settings) {
      return res.status(404).json({
        message: "Settings not found",
      });
    }

    // Move to Next Token
    settings.currentToken += 1;

    await settings.save();

    // Find Current Patient
    const patient = await Patient.findOne({
      token: settings.currentToken,
    });

    if (patient) {

      patient.status = "in_consultation";

      await patient.save();

    }

    // Socket.IO Update
    const io = req.app.get("io");

    io.emit("queueUpdated", {
      currentToken: settings.currentToken,
    });

    res.status(200).json({
      message: "Next patient called",
      currentToken: settings.currentToken,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// Complete Consultation

const completeConsultation = async (req, res) => {

  try {

    const settings = await Settings.findOne();

    if (!settings) {
      return res.status(404).json({
        message: "Settings not found",
      });
    }

    const patient = await Patient.findOne({
      token: settings.currentToken,
    });

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    patient.status = "completed";

    await patient.save();

    // Socket.IO Update
    const io = req.app.get("io");

    io.emit("queueUpdated");

    res.status(200).json({
      message: "Consultation Completed",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// Reset Queue

const resetQueue = async (req, res) => {

  try {

    // Delete All Patients
    await Patient.deleteMany({});

    // Reset Current Token
    const settings = await Settings.findOne();

    if (settings) {

      settings.currentToken = 0;

      await settings.save();

    }

    // Socket.IO Update
    const io = req.app.get("io");

    io.emit("queueUpdated");

    res.status(200).json({
      message: "Queue reset successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  callNextPatient,
  completeConsultation,
  resetQueue,
};
