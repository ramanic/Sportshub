const express = require("express");

const { authUser } = require("../../middleware/auth");
const Conversation = require("../../models/chat/Conversation");
const { JsonResponse } = require("../../utils/JsonResponse");

const router = express.Router();

// create a new conversation or get existing conversation
router.post("/", authUser, async (req, res) => {
  let conversation = await Conversation.findOne({
    members: { $all: [req.body.senderId, req.body.receiverId] },
  }).populate("members");

  if (!conversation) {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
    try {
      newConversation.save().then(async (savedConversation) => {
        await savedConversation.populate("members");
        res.status(200).json(JsonResponse(true, savedConversation));
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(JsonResponse(false, err.message));
    }
  } else {
    res.status(200).json(JsonResponse(true, conversation));
  }
});

// get conversation of a user
router.get("/", authUser, async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.user.user_id] },
    })
      .populate("members")
      .sort("-createdAt");

    res.status(200).json(JsonResponse(true, conversation));
  } catch (err) {
    console.log(err);
    res.status(400).json(JsonResponse(false, err.message));
  }
});

module.exports = router;
