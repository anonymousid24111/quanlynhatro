const bcrypt = require("bcryptjs");
const { pool } = require("../db");
const jwt = require("jsonwebtoken");
const { USER_ROLE } = require("../consts/user.const");
const { Op } = require("sequelize");
const ApartmentModel = require("../models/apartment.model");
const RoomModel = require("../models/room.model");
const ServiceModel = require("../models/service.model");

const createApartment = async (req, res) => {
    // Hash and salt password

    try {
        const { id } = req.decoded;
        console.log("req.decoded", req.decoded);
        const {
            name,
            address,
            cost,
            roomCount,
            city_code,
            district_code,
            ward_code,
            services,
        } = req.body;
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
            userprofileId: id,
            city_code,
            district_code,
            ward_code,
        });
        if (services) {
            await Promise.all(
                services.map((item) => {
                    return ServiceModel.create({
                        name: item.name,
                        cost: item.cost,
                        type: item.type,
                        unit: item.unit,
                        apartmentId: newApartment.id,
                    });
                })
            );
        }
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
        const {
            name,
            address,
            cost,
            roomCount,
            city_code,
            district_code,
            ward_code,
            services,
        } = req.body;
        if (!name || !address || !cost || !roomCount) {
            res.json({
                error: "Missing required fields",
            });
            return;
        }

        if (Array.isArray(services)) {
            await Promise.all(
                services.map((item) => {
                    if (!item.id) {
                        return ServiceModel.create({
                            name: item.name,
                            cost: Number(item.cost),
                            type: Number(item.type),
                            unit: item.unit,
                            apartmentId: id,
                        });
                    }
                    if (Number(item.action) === 2) {
                        return ServiceModel.destroy({
                            where: {
                                id: item.id,
                            },
                        });
                    }
                    return ServiceModel.update(
                        {
                            ...item,
                        },
                        {
                            where: {
                                id: item.id,
                            },
                        }
                    );
                })
            );
        }

        const currentApartment = await ApartmentModel.update(
            {
                name,
                address,
                cost,
                roomCount,
                city_code,
                district_code,
                ward_code,
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
        const newApartment = await ApartmentModel.findAll({
            include: ServiceModel,
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
const getReport = async (req, res) => {
    try {
        // const newApartment = await ApartmentModel.findAndCountAll({
        //     where:
        // });
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

const deleteApartment = async (req, res) => {
    try {
        const { id: currentId } = req.decoded;
        const { id } = req.params;
        if (!id) {
            res.json({
                error: "Missing id",
            });
            return;
        }
        const apartment = await ApartmentModel.destroy({
            where: {
                id,
            },
        });

        if (!apartment) {
            return res.json({
                error: "Current apartment not found",
            });
        }

        res.json({
            data: {
                apartment,
            },
        });
    } catch (error) {
        res.json({
            error: error,
        });
    }
};

module.exports = {
    createApartment,
    getListApartment,
    updateApartment,
    deleteApartment,
};
