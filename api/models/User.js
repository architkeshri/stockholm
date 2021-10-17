const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User Table
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    about: {
      type: String,
      required: true,
      default: "default",
    },
    emergency_contact: {
      type: String,
      required: true,
      default: "default",
    },
    gender: {
      type: String,
      required: true,
      default: "default",
    },
    sexual_preference: {
      type: String,
      required: true,
      default: "default",
    },
    location: String,
    education: String,
    occupation: String,
    activated: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    interests: {
      type: Array,
      default: [],
    },
    matches: {
      type: Array,
      default: [],
    },
    likes: {
      type: Array,
      default: [],
    },
    liked_by: {
      type: Array,
      default: [],
    },
    fb_link: String,
    ig_link: String,
    imagesurl: String,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(); //password encryption
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.post("save", function (doc, next) {
  console.log("New User Created", doc);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password); //decrypt and match password
    if (auth) {
      console.log(user);
      return user;
    }
    throw Error("Incorrect Password!");
  }
  throw Error("Incorrect Email");
};

const User = mongoose.model("users", userSchema);
module.exports = User;
