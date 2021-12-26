var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var testAPIRouter = require("./routes/testAPI");
var chatRouter = require("./routes/chat");

var conversationRouter = require("./routes/conversation");
var messageRouter = require("./routes/message");
//var calenderRouter = require("./routes/calender");
var calendarRouter = require("./routes/calendar");

var app = express();
dotenv.config({ path: "../.env" });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
//app.use("/calender",calenderRouter);
app.use("/calendar",calendarRouter);
app.use("/users", usersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/chat", chatRouter);
app.use("/conversation", conversationRouter);
app.use("/message", messageRouter);

//connection to MongoDB Atlas
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to DB Successful!");
  })
  .catch((err) => {
    console.log(err);
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
