const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const ApartmentModel = require("./apartment.model");
const ImageModel = require("./image.model");

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
    email: Sequelize.STRING,
    birthDay: Sequelize.DATE,
    city_code: Sequelize.INTEGER,
    district_code: Sequelize.INTEGER,
    ward_code: Sequelize.INTEGER,
    address: Sequelize.STRING,
    idnumber: Sequelize.INTEGER,
    dateOfIssue: Sequelize.DATE,
    placeOfIssue: Sequelize.STRING,
});

UserProfile.hasMany(ApartmentModel, { foreignKey: { allowNull: false } });
ApartmentModel.belongsTo(UserProfile);
UserProfile.hasMany(ImageModel, { foreignKey: { allowNull: false } });
ImageModel.belongsTo(UserProfile);

module.exports = UserProfile;
