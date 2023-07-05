const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const EquipmentModel = require("./equipment.model");
const ImageModel = require("./image.model");

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
RoomModel.hasMany(EquipmentModel, { foreignKey: { allowNull: false } });
EquipmentModel.belongsTo(RoomModel);
RoomModel.hasMany(ImageModel, { foreignKey: { allowNull: false } });
ImageModel.belongsTo(RoomModel);

module.exports = RoomModel;
