var express = require("express");
var router = express.Router();
const {
    createUser,
    login,
    getUserById,
    getMe,
    getTenants,
    deleteTenant,
    updateUser,
} = require("../controllers/user.controller");
const { isAuth } = require("../middlewares/auth.middleware");

router.post("/create", createUser);
router.post("/login", login);
router.get("/me", isAuth, getMe);
router.get("/tenants", isAuth, getTenants);
router.delete("/tenant/:id", isAuth, deleteTenant);
router.get("/:id", isAuth, getUserById);
router.post("/:id", isAuth, updateUser);
module.exports = router;
