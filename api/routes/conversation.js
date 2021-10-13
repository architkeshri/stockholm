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

module.exports = router;
