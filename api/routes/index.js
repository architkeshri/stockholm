var express = require('express');
var router = express.Router();

//import controller
const {signup, login, googlelogin, facebooklogin} = require("../controllers/auth");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', signup);                 //custom signup
router.post('/login',login);                    //custom login
router.post('/googlelogin', googlelogin);       //google login/signup
router.post('/facebooklogin', facebooklogin);   //facebook login/ signup

module.exports = router;
