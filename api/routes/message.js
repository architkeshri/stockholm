var express = require("express");
var router = express.Router();

const message = require("../models/Message");
router.get("/", function (req, res, next) {
  res.send("API is working properly");
});

module.exports = router;
