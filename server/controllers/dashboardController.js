const Patient = require("../models/patient");
const Settings = require("../models/Settings");

const getDashboardStats = async (req, res) => {
  try {
    const waitingPatients = await Patient.countDocuments({
      status: "waiting",
    });

    const completedPatients = await Patient.countDocuments({
      status: "completed",
    });

    const settings = await Settings.findOne();

    res.json({
      waitingPatients,
      completedPatients,
      currentToken: settings?.currentToken || 0,
      avgConsultationTime:
        settings?.avgConsultationTime || 0,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};
