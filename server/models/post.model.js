const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const RoomModel = require("./room.model");
const ImageModel = require("./image.model");

var PostModel = sequelize.define("post", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    status: Sequelize.INTEGER,
});

PostModel.hasOne(RoomModel, { foreignKey: { allowNull: false } });
RoomModel.belongsTo(PostModel);

module.exports = PostModel;
