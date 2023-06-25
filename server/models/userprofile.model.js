const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

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

module.exports = UserProfile;
