const mongoose = require("mongoose");

const settingsSchema =
  new mongoose.Schema({
    currentToken: {
      type: Number,
      default: 0,
    },

    avgConsultationTime: {
      type: Number,
      default: 8,
    },
  });

module.exports = mongoose.model(
  "Settings",
  settingsSchema
);
