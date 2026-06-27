const Settings =
require("../models/Settings");

const getSettings = async (
  req,
  res
) => {
  try {
    let settings =
      await Settings.findOne();

    if (!settings) {
      settings =
        await Settings.create({
          currentToken: 0,
          avgConsultationTime: 8,
        });
    }

    res.status(200).json(settings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateAvgTime = async (
  req,
  res
) => {
  try {
    const {
      avgConsultationTime,
    } = req.body;

    let settings =
      await Settings.findOne();

    if (!settings) {
      settings =
        await Settings.create({
          currentToken: 0,
          avgConsultationTime,
        });
    } else {
      settings.avgConsultationTime =
        avgConsultationTime;

      await settings.save();
    }

    res.status(200).json(settings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getSettings,
  updateAvgTime,
};
