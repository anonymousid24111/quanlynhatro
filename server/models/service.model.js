const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const ApartmentModel = require("./apartment.model");

var ServiceModel = sequelize.define("service", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
    cost: Sequelize.INTEGER,
    type: Sequelize.INTEGER,
    unit: Sequelize.STRING,
});

module.exports = ServiceModel;
