const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, reference: 'User' },
    text: { type: String, required: true },
    read: { type: Boolean, default: false },
    type: { type: String },
    link_id: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
