const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

var ImageModel = sequelize.define("image", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    url: Sequelize.STRING,
    alt: Sequelize.STRING,
    type: Sequelize.INTEGER,
});

module.exports = ImageModel;
