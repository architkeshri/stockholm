const User = require("../models/User");
const Conversation = require("../models/Conversation");

module.exports.updateprofile = (req, res) => {
  const {
    _id,
    dob,
    about,
    emergency_contact,
    gender,
    sexual_preference,
    location,
    education,
    occupation,
    interests,
    fb_link,
    ig_link,
    imagesurl,
    latitude,
    longitude,
  } = req.body;
  User.updateOne(
    { _id: _id },
    {
      $set: {
        dob: dob,
        about: about,
        emergency_contact: emergency_contact,
        gender: gender,
        sexual_preference: sexual_preference,
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
          address: location,
        },
        education: education,
        occupation: occupation,
        activated: true,
        interests: interests,
        fb_link: fb_link,
        ig_link: ig_link,
        imagesurl: imagesurl,
      },
    },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("User updateddd!!!");
        User.findOne({ _id }).exec((err, user) => {
          if (err) {
            return res.status(400).json({
              error: "1. something went wrong!",
            });
          } else {
            res.status(201).json({ user: user });
          }
        });
      }
    }
  );
};

module.exports.recommendations = (req, res) => {
  const pref = req.body.sexual_preference;
  if (pref === "Male" || pref === "Female" || pref === "Other") {
    User.find({ gender: pref }).exec((err, users) => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(201).json(users);
    });
  } else if (pref === "Both") {
    User.find({ gender: { $in: ["Male", "Female"] } }).exec((err, users) => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(201).json(users);
    });
  }
};

module.exports.filtersearch = (req, res) => {
  const lat = req.body.latitude;
  const lng = req.body.longitude;
  const maxDistance = req.body.maxDistance;
  const maxage = req.body.maxage;
  const interests = req.body.interests;
  const pref = req.body.pref;

  console.log("maxage", maxage);
  console.log("maxdist", maxDistance);
  console.log("interests", interests);
  const maxd = parseInt(maxDistance) * 1000;
  console.log("maxd", maxd);
  const YearsAgo = new Date();
  console.log(YearsAgo);
  YearsAgo.setFullYear(YearsAgo.getFullYear() - maxage);
  console.log(YearsAgo);

  var arr;
  if (pref === "Male") arr = ["Male"];
  else if (pref === "Female") arr = ["Female"];
  else if (pref === "Other") arr = ["Other"];
  else if (pref === "Both") arr = ["Male", "Female"];

  console.log("pref", pref);

  User.find({
    $and: [
      {
        location: {
          $near: {
            $geometry: { type: "Point", coordinates: [lng, lat] },
            $maxDistance: maxd,
          },
        },
      },
      {
        gender: { $in: arr },
      },
      {
        interests: { $in: interests },
      },
      {
        dob: { $gte: YearsAgo },
      },
    ],
  }).exec((err, results) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    return res.status(201).json(results);
  });
};

module.exports.like = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.liked_by.includes(req.body.userId)) {
        await user.updateOne({ $push: { liked_by: req.body.userId } });
        await currentUser.updateOne({ $push: { likes: req.params.id } });

        if (currentUser.liked_by.includes(user._id)) {
          await user.updateOne({ $push: { matches: req.body.userId } });
          await currentUser.updateOne({ $push: { matches: req.params.id } });
          //also add conversation table entry here later
          let userId = user._id.toString();
          let currId = currentUser._id.toString();
          const members = [userId, currId];
          let conversation = new Conversation({ members });
          conversation.save((err, data) => {
            if (err) {
              console.log("Conversation can't be created", err);
            } else {
              console.log("Conversation created", data);
            }
          });
          res.status(201).json("It's a match!");
        } else {
          res.status(201).json("User liked");
        }
      } else {
        res.status(403).json("You have already like this user!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't like yourself");
  }
};
