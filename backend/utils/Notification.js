const User = require('../models/common/User');
const Notification = require('../models/common/Notification');

const addNotification = async (userID, text, type, link_id) => {
  const notification = new Notification({
    owner: userID,
    text,
    link_id,
    type,
  });
  await notification.save();
  console.log(notification);
};

module.exports = { addNotification };
