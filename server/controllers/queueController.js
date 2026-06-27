const Settings = require("../models/Settings");

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

    // ==========================
    // Socket.IO
    // ==========================

    const io = req.app.get("io");

    io.emit("queueUpdated", {
      currentToken: settings.currentToken,
    });

    // ==========================

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

module.exports = {
  callNextPatient,
};
