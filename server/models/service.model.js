const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const BillServiceModel = require("./billservice.model");

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

ServiceModel.hasMany(BillServiceModel, { foreignKey: { allowNull: true } });
BillServiceModel.belongsTo(ServiceModel);

module.exports = ServiceModel;
