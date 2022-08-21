const mongoose = require('mongoose');

const VenueBookingSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Venue',
    },
    totalCost: { type: Number, required: true },
    date: {
      type: Date,
    },
    email: { type: String },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    token: {
      type: String,
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const VenueBooking = mongoose.model('VenueBooking', VenueBookingSchema);
module.exports = VenueBooking;
