const fs = require("fs");

// READ JSON FILE
module.exports = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, "utf8"));
// IMPORT DATA INTO process.env
