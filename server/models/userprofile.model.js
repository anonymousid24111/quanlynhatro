const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const ApartmentModel = require("./apartment.model");

var UserProfile = sequelize.define("userprofile", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    phone: Sequelize.STRING,
    role: Sequelize.INTEGER,
});

UserProfile.hasMany(ApartmentModel, { foreignKey: { allowNull: false } });
ApartmentModel.belongsTo(UserProfile);

module.exports = UserProfile;
