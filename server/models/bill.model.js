const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const BillServiceModel = require("./billservice.model");

var BillModel = sequelize.define("bill", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    status: Sequelize.INTEGER,
    applyMonth: Sequelize.DATE,
    totalCost: Sequelize.INTEGER,
});

BillModel.hasMany(BillServiceModel, { foreignKey: { allowNull: false } });
BillServiceModel.belongsTo(BillModel);

module.exports = BillModel;
