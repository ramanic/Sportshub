const mongoose = require("mongoose");
const VenueSchdeule = require("./VenueSchedule");

const VenueSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },

    highlights: [
      {
        type: String,
        required: true,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    location: {
      latitude: { type: String },
      longitude: { type: String },
    },
    address: {
      district: { type: String, require: false },
      city: { type: String, require: false },
    },
    phone: { type: Boolean, required: false },
    verified: { type: Boolean, default: false },
    venueSchedule: VenueSchdeule.VenueScheduleSchema,
    saves: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        reviewNumber: {
          type: Number,
        },
        reviewText: {
          type: String,
          trim: true,
        },
        reviewedAt: {
          type: Date,
          required: true,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Venue", VenueSchema);

module.exports = Product;
