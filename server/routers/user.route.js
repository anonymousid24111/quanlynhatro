var express = require("express");
var router = express.Router();
const {
    createUser,
    login,
    getUserById,
    getMe,
} = require("../controllers/user.controller");
const { isAuth } = require("../middlewares/auth.middleware");

router.post("/create", createUser);
router.post("/login", login);
router.get("/me", isAuth, getMe);
router.get("/:id", isAuth, getUserById);
module.exports = router;
