const express = require("express");
var router = express.Router();
const auth = require("../../middleware/auth");
const { JsonResponse, JsonResponseWithMSG } = require("../../utils/JsonResponse");
const Challenge = require("../../models/common/Challenge");
const User = require("../../models/common/User");
const { addNotification } = require("../../utils/Notification");

// Function to accept a challenge
router.post("/accept/:id", auth.authUser, async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    const challenger = await User.findById(challenge.challenger);
    const accepter = await User.findById(req.user.user_id);

    challenge.accepted = true;
    challenge.acceptedAt = new Date();
    challenge.acceptedBy = req.user.user_id;
    addNotification(
      challenger._id,
      `${accepter.name} accepted your challenge`,
      "challenge",
      challenge._id
    );
    await challenge.save();
    const changedChallenge = await Challenge.findById(req.params.id)
      .populate("venue")
      .populate("challenger")
      .populate("acceptedBy");
    res.status(200).json(JsonResponse(true, changedChallenge));
  } catch (err) {
    res.status(400).json(JsonResponse(false, error.message));
  }
});

// Function to get all the challenges
router.get("/", auth.authUser, async (req, res) => {
  try {
    const challenges = await Challenge.find()
      .populate("venue")
      .populate("challenger")
      .populate("acceptedBy")
      .sort("-createdAt")
      .exec();
    res.status(200).json(JsonResponse(true, challenges));
  } catch (err) {
    res.status(400).json(JsonResponse(false, error.message));
  }
});

module.exports = router;
