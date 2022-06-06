const sendErrorDev = function (err, req, res) {
  res.status(err.statusCode).json({
    err: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = function (err, req, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      err: err.status,
      message: err.message,
    });
  }
  // 1) log error
  console.error("ERROR 🎆🎆🎆", err);

  // 2) send generetic message
  res.status(500).json({
    status: "error",
    message: "Something went wrong!",
  });
};

module.exports = function (err, req, res, _) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  }
  if (process.env.NODE_ENV === "production") {
    sendErrorProd(error, req, res);
  }
};
