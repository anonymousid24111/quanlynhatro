const bcrypt = require("bcryptjs");
const { pool } = require("../db");
const jwt = require("jsonwebtoken");
const RoomModel = require("../models/room.model");

const createRoom = async (req, res) => {
    try {
        const { name, address, status, cost, maxAllow } = req.body;
        // validate data
        if (!name || !address || !cost || !status || !maxAllow) {
            res.json({
                error: "Missing required fields",
            });
            return;
        }

        const newRoom = await RoomModel.create({
            name,
            address,
            cost,
            maxAllow,
            status: 0,
            apartmentId: 1,
        });
        res.json({
            data: newRoom,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err,
        });
    }
};

const updateRoom = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.json({
                error: "Room is not found",
            });
            return;
        }
        const { name, address, status, cost, maxAllow } = req.body;
        if (!name || !address || !status || !cost || !maxAllow) {
            res.json({
                error: "Missing required fields",
            });
            return;
        }

        const currentRoom = await RoomModel.update(
            {
                name,
                address,
                status,
                cost,
                maxAllow,
            },
            {
                where: {
                    id,
                },
            }
        );

        res.json({
            data: currentRoom,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err,
        });
    }
};
const getListRoom = async (req, res) => {
    try {
        const roomList = await RoomModel.findAll();
        res.json({
            data: roomList,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err,
        });
    }
};

const deleteRoom = async (req, res) => {
    try {
        const { id: currentId } = req.decoded;
        const { id } = req.params;
        if (!id) {
            res.json({
                error: "Missing id",
            });
            return;
        }
        const room = await RoomModel.destroy({
            where: {
                id,
            },
        });

        if (!room) {
            return res.json({
                error: "Current room not found",
            });
        }

        res.json({
            data: {
                room,
            },
        });
    } catch (error) {
        res.json({
            error: error,
        });
    }
};

module.exports = {
    createRoom,
    updateRoom,
    getListRoom,
    deleteRoom,
};
