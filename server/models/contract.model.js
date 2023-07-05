const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const RoomModel = require("./room.model");

var ContractModel = sequelize.define("contract", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    cost: Sequelize.INTEGER,
    deposit: Sequelize.INTEGER,
    paymentCycle: Sequelize.INTEGER,
    collectionDate: Sequelize.INTEGER,
});

// define the Apartment-Room association
ContractModel.hasOne(RoomModel, { foreignKey: { allowNull: false } });
RoomModel.belongsTo(ContractModel);

module.exports = ContractModel;
