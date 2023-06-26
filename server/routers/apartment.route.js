var express = require("express");
var router = express.Router();
const { createApartment } = require("../controllers/apartment.controller");
const { isAuth } = require("../middlewares/auth.middleware");

router.post("/create", isAuth, createApartment);
module.exports = router;
