const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const EquipmentModel = require("./equipment.model");
const ImageModel = require("./image.model");
const BillModel = require("./bill.model");

var RoomModel = sequelize.define("room", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
    address: Sequelize.STRING,
    status: Sequelize.INTEGER,
    cost: Sequelize.INTEGER,
    maxAllow: Sequelize.INTEGER,
    acreage: Sequelize.INTEGER,
    deposit: Sequelize.INTEGER,
});
RoomModel.hasMany(EquipmentModel, { foreignKey: { allowNull: true } });
EquipmentModel.belongsTo(RoomModel);
RoomModel.hasMany(ImageModel, { foreignKey: { allowNull: true } });
ImageModel.belongsTo(RoomModel);
RoomModel.hasMany(BillModel, { foreignKey: { allowNull: true } });
BillModel.belongsTo(RoomModel);

module.exports = RoomModel;
