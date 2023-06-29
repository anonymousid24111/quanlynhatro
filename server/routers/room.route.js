var express = require("express");
var router = express.Router();
const {
    createRoom,
    getListRoom,
    updateRoom,
    deleteRoom,
} = require("../controllers/room.controller");
const { isAuth } = require("../middlewares/auth.middleware");

router.post("/create", isAuth, createRoom);
router.post("/update/:id", isAuth, updateRoom);
router.delete("/:id", isAuth, deleteRoom);
router.get("/list", isAuth, getListRoom);

module.exports = router;
