const express = require("express");

const { authUser } = require("../../middleware/auth");
const Message = require("../../models/chat/Message");
const { JsonResponse } = require("../../utils/JsonResponse");

const router = express.Router();

// create a new message
router.post("/", authUser, async (req, res) => {
  const newMessage = new Message({
    sender: req.user.user_id,
    text: req.body.text,
    conversationId: req.body.conversationId,
  });
  try {
    newMessage.save().then(async (savedMessage) => {
      await savedMessage.populate({
        path: "conversationId",
        populate: {
          path: "members",
          model: "User",
        },
      });
      await savedMessage.populate("sender");

      res.status(200).json(JsonResponse(true, savedMessage));
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(JsonResponse(false, err.message));
  }
});

// get all the messages of a conversation
router.get("/:conversationId", authUser, async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    })
      .populate({
        path: "conversationId",
        populate: {
          path: "members",
          model: "User",
        },
      })
      .populate("sender");

    res.status(200).json(JsonResponse(true, messages));
  } catch (err) {
    console.log(err);
    res.status(400).json(JsonResponse(false, err.message));
  }
});

module.exports = router;
