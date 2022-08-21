const express = require("express");
const crypto = require("crypto");
var router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/common/User");
const Post = require("../../models/social-media/Post");

const { JsonResponse } = require("../../utils/JsonResponse");
const { MulterUpload, CloudinaryUpload } = require("../../utils/ImageManager");
const fs = require("fs");
const Notification = require("../../models/common/Notification");
const { addNotification } = require("../../utils/Notification");
const { authUser } = require("../../middleware/auth");
const sendgrid = require("../../utils/sendgrid");

router.get("/me", authUser, async (req, res) => {
  let user = await User.findOne({
    _id: req.user.user_id,
  })
    .populate("profile")
    .populate("profile.saved.products")
    .populate("profile.saved.posts")

    .exec();
  let posts = await Post.find({
    author: req.user.user_id,
  })
    .populate("author")
    .populate("likes")
    .populate("saves")
    .exec();
  res.json(JsonResponse(true, { user, posts }));
});

router.post("/notifications/read/:id", authUser, async (req, res) => {
  let notification = await Notification.findById(req.params.id);
  notification.read = true;
  await notification.save();
  res.json(JsonResponse(true, "Notification marked read."));
});
router.post("/notifications/readAll", authUser, async (req, res) => {
  let notifications = await Notification.find({
    owner: req.user.user_id,
  })
    .sort("-createdAt")
    .exec();
  await Promise.all(
    notifications.map(async (item, index) => {
      item.read = true;
      await item.save();
    })
  );
  res.json(JsonResponse(true, "Notifications marked read."));
});
router.get("/notifications", authUser, async (req, res) => {
  let notifications = await Notification.find({
    owner: req.user.user_id,
  })
    .sort("-createdAt")
    .exec();

  res.json(JsonResponse(true, notifications));
});

router.get("/user/:username", authUser, async (req, res) => {
  let { username } = req.params;
  let user = await User.findOne({
    username: username,
  });
  let posts = await Post.find({
    author: user._id,
  })
    .populate("author")
    .populate({ path: "likes", select: "name username profile.photo" })
    .populate("saves")
    .exec();
  res.json(JsonResponse(true, { user, posts }));
});

router.post("/update", authUser, MulterUpload.single("image"), async (req, res) => {
  console.log(req.body);
  const { name, username, district, phone, bio, city, preferences, email } = req.body;
  let image = null;
  if (req.file) {
    image = req.file.path;
  }

  let userUpdate = {};

  if (name) userUpdate.name = name;
  if (username) userUpdate.username = username;
  if (email) userUpdate.email = email;
  try {
    let user = null;

    user = await User.findOneAndUpdate({ _id: req.user.user_id }, userUpdate, {
      new: true,
      runValidators: true,
    });

    if (district) user.profile.address.district = district;
    if (city) user.profile.address.city = city;
    if (preferences) user.profile.preferences = await JSON.parse(preferences);
    if (phone) user.profile.phone = phone;
    if (bio) user.profile.bio = bio;
    await user.save();
    if (image != null) {
      console.log("A");
      let uploadedImage = await CloudinaryUpload(image);
      fs.unlinkSync(image);
      if (uploadedImage.url) {
        user.profile.photo = uploadedImage.url;
        await user.save();
      }
    }

    res.json(JsonResponse(true, user));
  } catch (err) {
    res.json(JsonResponse(false, err.message));
  }
});

router.post("/photo/update", authUser, MulterUpload.single("image"), async (req, res) => {
  let image = req.file.path;
});

router.post("/add-friend", authUser, async (req, res) => {
  let { username, id } = req.body;
  let user = null;

  if (username) {
    user = await User.findOne({ username: username });
  }
  if (id) {
    user = await User.findOne({ _id: id });
  }

  if (!user) {
    return res.json(JsonResponse(false, "User not found"));
  }
  let mainUser = await User.findOne({ _id: req.user.user_id });
  mainUser.profile.friends.push({ user: user._id, status: "sent", sent: new Date() });
  await mainUser.save();
  user.profile.friends.push({ user: mainUser._id, status: "received", sent: new Date() });
  await user.save();
  addNotification(
    user._id,
    `${mainUser.name} sent you a friend request.`,
    "friend-request",
    mainUser._id
  );
  res.json(JsonResponse(true, "Friend request sent"));
});
router.post("/accept-friend", authUser, async (req, res) => {
  let { id } = req.body;

  let user = await User.findOne({ _id: req.user.user_id });
  let friends = user.profile.friends;
  friends = friends.map((friend) => {
    if (friend.user == id) {
      friend.status = "accepted";
      friend.accepted = new Date();
    }
    return friend;
  });
  user.profile.friends = friends;
  user.save();

  let user2 = await User.findOne({ _id: id });
  friends = user2.profile.friends;
  friends = friends.map((friend) => {
    if (friend.user == req.user.user_id) {
      friend.status = "accepted";
    }
    return friend;
  });
  user2.profile.friends = friends;
  user2.save();

  addNotification(
    id,
    `${user.name} accepted your friend request.`,
    "friend-accept",
    req.user.user_id
  );
  res.json(JsonResponse(true, "Friend request accepted"));
});
router.post("/remove-friend", authUser, async (req, res) => {
  let { id } = req.body;

  let user = await User.findOne({ _id: req.user.user_id });
  let friends = user.profile.friends;
  friends = friends.filter((friend) => {
    return friend.user != id;
  });
  user.profile.friends = friends;
  user.save();

  let user2 = await User.findOne({ _id: id });
  friends = user2.profile.friends;
  friends = friends.filter((friend) => {
    return friend.user != req.user.user_id;
  });
  user2.profile.friends = friends;
  user2.save();
  res.json(JsonResponse(true, "Friend Removed"));
});

router.get("/friends", authUser, async (req, res) => {
  var filter = req.query.filter;
  let mainUser = await User.findOne({ _id: req.user.user_id }).populate("profile.friends.user");
  friends = mainUser.profile.friends;

  if (filter == "sent") {
    friends = friends.filter((friend) => friend.status == "sent");
  } else if (filter == "received") {
    friends = friends.filter((friend) => friend.status == "received");
  } else {
    friends = friends.filter((friend) => friend.status == "accepted");
  }
  res.json(JsonResponse(true, friends));
});

// Get saved user data
router.get("/saved", authUser, async (req, res) => {
  let user = await User.findOne({
    _id: req.user.user_id,
  })
    .populate("profile.saved.products")
    .populate({
      path: "profile.saved.posts",
      populate: { path: "author", select: "_id name username email profile.photo" },
    })
    .populate("profile.saved.venues")
    .exec();

  res.json(JsonResponse(true, { saved: user.profile.saved }));
});

// Route to change user password
router.post("/changePassword", authUser, async (req, res) => {
  try {
    let foundUser = await User.findById(req.user.user_id);
    const encryptedPassword = await bcrypt.hash(req.body.newPassword, 10);
    foundUser.password = encryptedPassword;
    await foundUser.save();
    res.json(JsonResponse(true, "Password changed"));
  } catch (err) {
    res.status(400).send(JsonResponse(false, err.message));
  }
});

// Route to reset user password
router.post("/resetPassword", async (req, res) => {
  try {
    let foundUser = await User.findOne({
      email: req.body.email,
    });
    console.log(foundUser);
    const passwordResetString = crypto.randomBytes(64).toString("hex");
    foundUser.passwordResetString = passwordResetString;
    await foundUser.save();
    sendgrid.sendPasswordResetEmail(foundUser);

    res.json(JsonResponse(true, "Password reset link sent"));
  } catch (err) {
    res.status(400).send(JsonResponse(false, err.message));
  }
});

// Function to check validity of reset string
router.post("/checkResetString/:resetString", async (req, res) => {
  try {
    const resetString = req.params.resetString;
    let brokenResetString = resetString.split(".");

    const foundUser = await User.findOne({
      passwordResetString: brokenResetString[0],
      _id: brokenResetString[1],
    });

    if (!foundUser) {
      res.status(400).send(JsonResponse(false, "Invalid password reset string"));
    } else {
      res.json(JsonResponse(true, "Valid password reset link"));
    }
  } catch (err) {
    res.status(400).send(JsonResponse(false, err.message));
  }
});

// Function to reset to a new password
router.post("/resetNewPassword/:resetString", async (req, res) => {
  try {
    const resetString = req.params.resetString;
    let brokenResetString = resetString.split(".");

    const foundUser = await User.findOne({
      passwordResetString: brokenResetString[0],
      _id: brokenResetString[1],
    });

    if (!foundUser) {
      res.status(400).send(JsonResponse(false, "Invalid password reset string"));
    } else {
      const encryptedPassword = await bcrypt.hash(req.body.password, 10);
      foundUser.password = encryptedPassword;
      foundUser.passwordResetString = "";
      await foundUser.save();
      sendgrid.sendPasswordResetSuccessEmail(foundUser);
      res.json(JsonResponse(true, "Password reset successfully"));
    }
  } catch (err) {
    res.status(400).send(JsonResponse(false, err.message));
  }
});

module.exports = router;
