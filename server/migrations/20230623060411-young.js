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
            city_code: Sequelize.INTEGER,
            district_code: Sequelize.INTEGER,
            ward_code: Sequelize.INTEGER,
            userprofileId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "userprofiles",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
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
                allowNull: true,
                references: {
                    model: "apartments",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
        });
        await queryInterface.createTable("services", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: Sequelize.STRING,
            cost: Sequelize.INTEGER,
            type: Sequelize.INTEGER,
            unit: Sequelize.STRING,
            apartmentId: {
                type: Sequelize.INTEGER,
                allowNull: true,
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
        await queryInterface.dropTable("services");
        await queryInterface.dropTable("rooms");
        await queryInterface.dropTable("apartments");
        await queryInterface.dropTable("userprofiles");
    },
};
