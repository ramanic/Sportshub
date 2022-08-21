const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to send password reset email
exports.sendPasswordResetEmail = (user) => {
  const dynamicTemplateData = {
    username: user.username,
    reset_link: `${process.env.CLIENT_BASE_URL}/new-password/${user.passwordResetString}.${user._id}`,
  };

  const message = {
    to: user.email,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: "Password reset",
    dynamicTemplateData: dynamicTemplateData,
    template_id: process.env.SENDGRID_RESET_PASSWORD_TEMPLATE_ID,
  };

  sgMail
    .send(message)
    .then(() => console.log("Password reset email send successfully"))
    .catch((err) => {
      Promise.reject(err);
    });
};

// Function to send password reset success email
exports.sendPasswordResetSuccessEmail = (user) => {
  const dynamicTemplateData = {
    username: user.username,
  };

  const message = {
    to: user.email,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: "Password reset successful",
    dynamicTemplateData: dynamicTemplateData,
    template_id: process.env.SENDGRID_RESET_PASSWORD_SUCCESS_TEMPLATE_ID,
  };

  sgMail
    .send(message)
    .then(() => console.log("Password reset successfully"))
    .catch((err) => {
      Promise.reject(err);
    });
};

// Function to send new user registration email
exports.sendRegistrationSuccessEmail = (user) => {
  const dynamicTemplateData = {
    username: user.username,
    homepage_link: `${process.env.CLIENT_BASE_URL}/home`,
  };

  const message = {
    to: user.email,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: "Welcome to Sports-Hub",
    dynamicTemplateData: dynamicTemplateData,
    template_id: process.env.SENDGRID_NEW_REGISTRATION_TEMPLATE_ID,
  };

  sgMail
    .send(message)
    .then(() => console.log("User registered successfully"))
    .catch((err) => {
      Promise.reject(err);
    });
};

// Function to send venue verified email
exports.sendVenueVerifiedEmail = (venue) => {
  const dynamicTemplateData = {
    username: venue.owner.username,
    venueName: venue.name,
    venues_link: `${process.env.CLIENT_BASE_URL}/my-venues`,
  };

  const message = {
    to: venue.owner.email,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: "Venue verified",
    dynamicTemplateData: dynamicTemplateData,
    template_id: process.env.SENDGRID_VENUE_VERIFIED_TEMPLATE_ID,
  };

  sgMail
    .send(message)
    .then(() => console.log("Venue verified email sent"))
    .catch((err) => {
      Promise.reject(err);
    });
};

// Function to send a product order email
exports.sendProductOrderEmail = (order, user) => {
  const dynamicTemplateData = {
    username: user.username,
    orderId: order._id,
    totalProducts: order.products.length,
    amountPaid: order.totalCost,
    // venues_link: `${process.env.CLIENT_BASE_URL}/my-venues`,
  };

  const message = {
    to: user.email,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: "Your order has been received",
    dynamicTemplateData: dynamicTemplateData,
    template_id: process.env.SENDGRID_PRODUCT_ORDER_TEMPLATE_ID,
  };

  sgMail
    .send(message)
    .then(() => console.log("Product order email sent"))
    .catch((err) => {
      Promise.reject(err);
    });
};
