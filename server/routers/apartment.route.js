var express = require("express");
var router = express.Router();
const {
    createApartment,
    getListApartment,
    updateApartment,
} = require("../controllers/apartment.controller");
const { isAuth } = require("../middlewares/auth.middleware");

router.post("/create", isAuth, createApartment);
router.post("/update/:id", isAuth, updateApartment);
router.get("/list", isAuth, getListApartment);

module.exports = router;
