const express = require("express");
const apiHandler = require("../controllers/apiHandler");
const router = express.Router();

router.get("/", apiHandler.getData);
router.get("/:spaceDoor/:quantity", apiHandler.getAllPossibleSpaceDoors);
router.get("/path/:initialDoor/:finalDoor", apiHandler.getSimplePath);

module.exports = router;
