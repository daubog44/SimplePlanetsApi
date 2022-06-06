require("dotenv").config({
  path: `${__dirname}/config.env`,
});

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 🎆 Sutting down...");
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});

const app = require("./app");

const port = process.env.PORT || 80;
const server = app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
  console.log("ALL ROUTES: ");
  console.table([
    "http://localhost:80/api/v1/global/",
    "http://localhost:80/api/v1/global/:spaceDoor/:quantity",
    "http://localhost:80/api/v1/global/path/:initialDoor/:finalDoor",
  ]);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 🎆 Sutting down...");
  console.log(err.name, err.message, err.stack);
  server.close(() => {
    process.exit(1);
  });
});
