const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

var BillServiceModel = sequelize.define("billservice", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    startNumber: Sequelize.INTEGER,
    endNumber: Sequelize.INTEGER,
    count: Sequelize.INTEGER,
    totalCost: Sequelize.INTEGER,
});

module.exports = BillServiceModel;
