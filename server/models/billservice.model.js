const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const ServiceModel = require("./service.model");

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

BillServiceModel.hasMany(ServiceModel, { foreignKey: { allowNull: true } });
ServiceModel.belongsTo(BillServiceModel);

module.exports = BillServiceModel;
