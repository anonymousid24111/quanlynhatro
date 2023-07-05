const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

var EquipmentModel = sequelize.define("equipment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
    count: Sequelize.INTEGER,
});

module.exports = EquipmentModel;
