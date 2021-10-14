var express = require("express");
var router = express.Router();

const Message = require("../models/Message");

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const saveMessage = await newMessage.save();
    res.status(200).json(saveMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/:con", async (req, res) => {
//   try {
//   } catch {}
// });

module.exports = router;
