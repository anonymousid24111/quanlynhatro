var express = require("express");
var router = express.Router();
const {
    createRoom,
    getListRoom,
    updateRoom,
    deleteRoom,
    createContract,
    createBill,
    getListBill,
} = require("../controllers/room.controller");
const { isAuth } = require("../middlewares/auth.middleware");

router.post("/create", isAuth, createRoom);
router.post("/createContract", isAuth, createContract);
router.post("/createBill", isAuth, createBill);
router.post("/update/:id", isAuth, updateRoom);
router.delete("/:id", isAuth, deleteRoom);
router.get("/list", isAuth, getListRoom);
router.get("/getListBill", isAuth, getListBill);

module.exports = router;
