const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    token: {
      type: Number,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: [
        "waiting",
        "in_consultation",
        "completed",
        "cancelled",
      ],
      default: "waiting",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Patient",
  patientSchema
);
