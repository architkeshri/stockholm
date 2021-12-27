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

//getting all the conversation of current logged in user with user>_id

router.get("/:id", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.id] },
    });
    console.log(conversation);
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// geting  receciver information by conversation id => to be filtred out in frontend
// why ? => to show profile picture and name in the chat box

router.get("/receiver/:id", async (req, res) => {
  try {
    const reciever = await Conversation.findById(req.params.id);
    res.status(200).json(reciever);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
