"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable("userprofiles", {
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
        await queryInterface.createTable("apartments", {
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
        });
        await queryInterface.createTable("rooms", {
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
            apartmentId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "apartments",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('userprofiles');
         */
        await queryInterface.dropTable("userprofiles");
        await queryInterface.dropTable("apartments");
        await queryInterface.dropTable("rooms");
    },
};
