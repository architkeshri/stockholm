var express = require("express");
var router = express.Router();

const Conversation = require("../models/Conversation");

//new comversation
router.post("/", async (req, res) => {
  const newConvo = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConvo = await newConvo.save();
    res.status(200).json(savedConvo);
  } catch (err) {
    res.status(500).json(err);
  }
});

//getting convo of user

router.get("/:id", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.id] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
