const Patient = require("../models/patient");
const Settings = require("../models/Settings");

const getPatientStatus = async (req, res) => {
  try {
    const { token } = req.params;

    const patient = await Patient.findOne({
      token: Number(token),
    });

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    const settings =
      await Settings.findOne();

    const currentToken =
      settings.currentToken;

    const avgTime =
      settings.avgConsultationTime;

    const patientsAhead =
      Math.max(
        patient.token - currentToken - 1,
        0
      );

    const estimatedWait =
      patientsAhead * avgTime;

    res.status(200).json({
      patientName: patient.name,
      patientToken: patient.token,
      currentToken,
      patientsAhead,
      estimatedWait,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getPatientStatus,
};
