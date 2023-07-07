const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const BillServiceModel = require("./billservice.model");
const RoomModel = require("./room.model");
const UserProfile = require("./userprofile.model");

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

BillModel.hasMany(BillServiceModel, { foreignKey: { allowNull: true } });
BillServiceModel.belongsTo(BillModel);

// BillModel.hasOne(UserProfile, { foreignKey: { allowNull: true } });
// UserProfile.belongsTo(BillModel);

module.exports = BillModel;
