const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const AppError = require("./utils/AppError");
const globalRoute = require("./routes/globalRoute");
const errorController = require("./controllers/errorController");

const app = express();
// GLOBAL MIDDLEWERE
//app.use(cors());
//app.options("*", cors());
app.use(helmet());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// data sanitization againt XSS
app.use(xss());

// ROUTES
app.use("/api/v1/global", globalRoute);

app.all("*", function (req, res, next) {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server`, 404)
  );
});

app.use(errorController);

module.exports = app;
