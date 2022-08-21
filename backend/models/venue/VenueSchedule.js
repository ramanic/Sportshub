const mongoose = require('mongoose');

const VenueScheduleSchema = new mongoose.Schema(
  {
    sameEveryday: { type: Boolean, required: true, default: true },
    bookingAllowed: { type: Boolean, required: true, default: true },
    bookingGaps: { type: Number, required: true, default: 7 },
    default_timing: [
      {
        startTime: { type: String },
        endTime: { type: String },
        price: { type: String },
      },
    ],
    days: [
      {
        day: {
          type: String,
          enum: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
        },
        timing: [
          {
            startTime: { type: String },
            endTime: { type: String },
            price: { type: String },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const VenueSchedule = mongoose.model('VenueSchdeule', VenueScheduleSchema);

module.exports = { VenueSchedule, VenueScheduleSchema };
