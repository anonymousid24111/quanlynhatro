const bcrypt = require("bcryptjs");
const { pool } = require("../db");
const jwt = require("jsonwebtoken");
const UserProfile = require("../models/userprofile.model");
const { USER_ROLE } = require("../consts/user.const");
const { Op } = require("sequelize");
const ApartmentModel = require("../models/apartment.model");
const RoomModel = require("../models/room.model");

const createApartment = async (req, res) => {
    // Hash and salt password

    try {
        const { name, address, cost, roomCount } = req.body;
        // validate data
        if (!name || !address || !cost || !roomCount) {
            res.json({
                error: "Missing required fields",
            });
            return;
        }

        const newApartment = await ApartmentModel.create({
            name,
            address,
            cost,
            roomCount,
            status: 0,
        });
        res.json({
            data: newApartment,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err,
        });
    }
};
const updateApartment = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.json({
                error: "Apartment is not found",
            });
            return;
        }
        const { name, address, cost, roomCount } = req.body;
        if (!name || !address || !cost || !roomCount) {
            res.json({
                error: "Missing required fields",
            });
            return;
        }

        const currentApartment = await ApartmentModel.update(
            {
                name,
                address,
                cost,
                roomCount,
            },
            {
                where: {
                    id,
                },
            }
        );

        res.json({
            data: currentApartment,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err,
        });
    }
};
const getListApartment = async (req, res) => {
    try {
        const newApartment = await ApartmentModel.findAll();
        res.json({
            data: newApartment,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err,
        });
    }
};

module.exports = {
    createApartment,
    getListApartment,
    updateApartment,
};
