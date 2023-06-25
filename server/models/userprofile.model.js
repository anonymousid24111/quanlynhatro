const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");

var UserProfile = sequelize.define("userprofile", {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    phone: Sequelize.STRING,
    role: Sequelize.INTEGER,
});

module.exports = UserProfile;
