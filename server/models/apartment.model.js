const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const RoomModel = require("./room.model");
const ServiceModel = require("./service.model");

var ApartmentModel = sequelize.define("apartment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
    address: Sequelize.STRING,
    roomCount: Sequelize.INTEGER,
    status: Sequelize.INTEGER,
    cost: Sequelize.INTEGER,
    city_code: Sequelize.INTEGER,
    district_code: Sequelize.INTEGER,
    ward_code: Sequelize.INTEGER,
});

// define the Apartment-Room association
ApartmentModel.hasMany(RoomModel, { foreignKey: { allowNull: true } });
RoomModel.belongsTo(ApartmentModel);
ApartmentModel.hasMany(ServiceModel, { foreignKey: { allowNull: true } });
ServiceModel.belongsTo(ApartmentModel);

module.exports = ApartmentModel;
