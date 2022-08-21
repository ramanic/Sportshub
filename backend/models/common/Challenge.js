const mongoose = require("mongoose");

const ChallengeSchema = new mongoose.Schema(
  {
    challenger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    accepted: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
    },
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    acceptedAt: {
      type: Date,
    },
    details: { type: Object },
  },
  { timestamps: true }
);

const Challenge = mongoose.model("Challenge", ChallengeSchema);

module.exports = Challenge;
