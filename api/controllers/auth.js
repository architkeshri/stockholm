const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");

const client = new OAuth2Client(
  process.env.CLIENT_ID_1
);
const maxAge = 3 * 24 * 60 * 60;

//creating JWT Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_USER, {
    expiresIn: maxAge,
  });
};

//Custom Signup
module.exports.signup = (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({ error: "user with this email already exists!" });
    }

    let newUser = new User({ name, email, password });
    newUser.save((err, success) => {
      if (err) {
        console.log("Error in signup: ", err);
        return res.status(400).json({ error: err });
      }
      const token = createToken(newUser._id);
      res.cookie("jwt", token, {
        secure: process.env.NODE_ENV === "production" ? true : false,
        httpOnly: process.env.NODE_ENV === "production" ? true : false,
        maxAge: maxAge * 1000,
      });
      res.status(201).json({ user: newUser });
    });
  });
};

//Custom Login
module.exports.login = async (req, res) => {
  res.clearCookie("jwt");
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      secure: process.env.NODE_ENV === "production" ? true : false,
      httpOnly: process.env.NODE_ENV === "production" ? true : false,
      maxAge: maxAge * 1000,
    });
    console.log(user._id);
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

//Google Login/ Signup: Extracting email from response and checking if that user exists. If exists: login, else signup
module.exports.googlelogin = (req, res) => {
  const { tokenId } = req.body;
  client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.CLIENT_ID_1,
    }).then((response) => {
      const { email_verified, name, email } = response.payload;
      //console.log(response.payload);
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (err) {
            console.log("error1");
            console.log(err);
            return res.status(400).json({
              error: "1. something went wrong!",
            });
          } else {
            if (user) {
              //login
              const token = createToken(user._id);
              console.log("Token:", token);
              res.cookie("jwt", token, {
                secure: process.env.NODE_ENV === "production"? true: false,
                httpOnly: process.env.NODE_ENV === "production"? true: false,
                maxAge: maxAge * 1000,
              });
              console.log("Google Login Success!");
              res.status(201).json({ user: user });
            } else {
              let password = email + process.env.JWT_SECRET_USER;
              let newUser = new User({ name, email, password });
              newUser.save((err, data) => {
                //signup
                if (err) {
                    console.log(err);
                  return res.status(400).json({
                    error: "2. something went wrong!",
                  });
                } else {
                    //login
                    const token = createToken(newUser._id);
                    console.log("Token:", token);
                    res.cookie("jwt", token, {
                      secure: process.env.NODE_ENV === "production" ? true : false,
                      httpOnly: process.env.NODE_ENV === "production" ? true : false,
                      maxAge: maxAge * 1000,
                    });
                    console.log("Google Signup Success!");
                    res.status(200).json({ user: newUser });
                  } 
            })
          }
        }
      })
    }
});
}

//Facebook Login/ Signup: Extracting email from response and checking if that user exists. If exists: login, else signup
module.exports.facebooklogin = (req, res) => {
  const { userID, accessToken } = req.body;
  let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
  fetch(urlGraphFacebook, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      const { email, name } = response;
      console.log(email);
      User.findOne({ email }).exec((err, user) => {
        if (err) {
          return res.status(400).json({
            error: "1. something went wrong!",
          });
        } else {
          if (user) {
            //Login
            const token = createToken(user._id);
            const { _id, name, email } = user;
            res.json({ token, user: { _id, name, email } });
          } else {
            let password = email + process.env.JWT_SECRET_USER;
            let newUser = new User({ name, email, password });
            newUser.save((err, data) => {
              //signup
              if (err) {
                return res.status(400).json({
                  error: "2. something went wrong!",
                });
              } else {
                const token = createToken(data._id);
                const { _id, name, email } = newUser;
                res.json({ token, user: { _id, name, email } });
              }
            });
          }
        }
      });
    });
};

module.exports.logout = async (req, res) => {
  res.cookie("jwt", "expiredtoken", {
    expires: new Date(Date.now() + 5000),
    secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: process.env.NODE_ENV === "production" ? true : false,
  });
  res.status(200).json({ status: "logout success!" });
};
