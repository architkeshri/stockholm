var express = require("express");
var router = express.Router();

const {createevent, getevents} = require('../controllers/calendar');

router.post('/create-event', createevent);
router.get('/get-events/:id',getevents); 

module.exports = router;
