const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const ApartmentModel = require("./apartment.model");

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
    // apartment: Sequelize.INTEGER,
});

// ApartmentModel.hasMany(RoomModel, { foreignKey: { allowNull: false } });
// RoomModel.belongsTo(ApartmentModel);

module.exports = RoomModel;
