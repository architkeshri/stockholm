var express = require("express");
var router = express.Router();

const User = require("../models/User");

router.get("/:id", async (req, res) => {
  let userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
