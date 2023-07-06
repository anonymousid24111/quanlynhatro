const bcrypt = require("bcryptjs");
const { pool } = require("../db");
const jwt = require("jsonwebtoken");
const RoomModel = require("../models/room.model");
const ApartmentModel = require("../models/apartment.model");
const EquipmentModel = require("../models/equipment.model");
const ContractModel = require("../models/contract.model");

const createRoom = async (req, res) => {
    try {
        const {
            name,
            address,
            status,
            cost,
            maxAllow,
            apartmentId,
            acreage,
            equipments,
            deposit,
        } = req.body;
        // validate data
        if (!name || !address || !cost || !maxAllow || !apartmentId) {
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
            apartmentId,
            acreage,
            deposit,
        });
        if (Array.isArray(equipments)) {
            await Promise.all(
                equipments.map((equipment) => {
                    const { action, id: itemId, name } = equipment || {};
                    return EquipmentModel.create({
                        name,
                        count: 1,
                        roomId: newRoom.id,
                    });
                })
            );
        }
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

const createContract = async (req, res) => {
    try {
        const {
            cost,
            deposit,
            paymentCycle,
            collectionDate,
            startDate,
            endDate,
            roomId,
        } = req.body;
        // validate data
        if (!cost) {
            res.json({
                error: "Missing required fields",
            });
            return;
        }

        const newContract = await ContractModel.create({
            cost,
            deposit,
            paymentCycle,
            collectionDate,
            startDate,
            endDate,
        });
        await RoomModel.update(
            {
                roomId: newContract.id,
            },
            {
                where: {
                    id: roomId,
                },
            }
        );
        res.json({
            data: newContract,
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
        const {
            name,
            address,
            status,
            cost,
            maxAllow,
            acreage,
            equipments,
            deposit,
        } = req.body;
        if (!name || !address || !cost || !maxAllow) {
            res.json({
                error: "Missing required fields",
            });
            return;
        }

        if (Array.isArray(equipments)) {
            await Promise.all(
                equipments.map((item) => {
                    const { action, id: itemId, name } = item || {};
                    if (action === 2) {
                        return EquipmentModel.destroy({
                            where: {
                                id: itemId,
                            },
                        });
                    }
                    if (action === 0) {
                        return EquipmentModel.create({
                            name,
                            count: 1,
                            roomId: id,
                        });
                    }
                })
            );
        }

        const currentRoom = await RoomModel.update(
            {
                name,
                address,
                status,
                cost,
                maxAllow,
                acreage,
                deposit,
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
        console.log("req.query", req.query);
        const { id } = req.query;
        const roomList = await RoomModel.findAll({
            where: {
                apartmentId: Number(id),
            },
            include: [ApartmentModel, EquipmentModel],
        });
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
    createContract,
};
