var express = require("express");
var router = express.Router();
const { createRoom } = require("../controllers/room.controller");
const { isAuth } = require("../middlewares/auth.middleware");

router.post("/create", isAuth, createRoom);
module.exports = router;
