var express = require('express');
var router = express.Router();

//import controller
const {signup, login, googlelogin, facebooklogin, logout} = require("../controllers/auth");
const {checkUser} = require('../middleware/auth');
const {updateprofile, recommendations} = require("../controllers/user");
const {addpost, timeline, deletepost} = require('../controllers/post');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', signup);                 //custom signup
router.post('/login',login);                    //custom login
router.post('/googlelogin', googlelogin);       //google login/signup
router.post('/facebooklogin', facebooklogin);   //facebook login/ signup

router.use(checkUser);                          //all the routes after this are secure/protected
router.post('/updateprofile',updateprofile);    //update user profile
router.post('/addpost',addpost);
router.post('/deletepost/:id',deletepost);
router.get('/timeline',timeline);
router.get('/recommendations', recommendations);
router.get('/logout', logout);

module.exports = router;
