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
    updateBill,
    getAllRoom,
    getAllPost,
} = require("../controllers/room.controller");
const { isAuth } = require("../middlewares/auth.middleware");

router.post("/create", isAuth, createRoom);
router.post("/createContract", isAuth, createContract);
router.post("/createBill", isAuth, createBill);
router.post("/update/:id", isAuth, updateRoom);
router.post("/updateBill/:id", isAuth, updateBill);
router.delete("/:id", isAuth, deleteRoom);
router.get("/list", isAuth, getListRoom);
router.get("/getAllRoom", isAuth, getAllRoom);
router.get("/getAllPost", isAuth, getAllPost);
router.get("/getListBill", isAuth, getListBill);

module.exports = router;
