var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const { url } = require("./config/db.confiq");

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log(url, "monggo db url");

mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb atlas at port 27017");
});

mongoose.connection.on("error", (err) => {
  if (err) {
    console.log("error connecting to mongodb:" + err);
  }
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const cityRouter = require("./routes/city");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/city", cityRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//porl

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
