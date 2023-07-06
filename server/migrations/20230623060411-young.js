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
        await queryInterface.createTable("contracts", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            startDate: Sequelize.DATE,
            endDate: Sequelize.DATE,
            cost: Sequelize.INTEGER,
            deposit: Sequelize.INTEGER,
            paymentCycle: Sequelize.INTEGER,
            collectionDate: Sequelize.INTEGER,
        });
        await queryInterface.createTable("posts", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: Sequelize.STRING,
            description: Sequelize.STRING,
            status: Sequelize.INTEGER,
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
            acreage: Sequelize.INTEGER,
            deposit: Sequelize.INTEGER,
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
            contractId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "contracts",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            postId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "posts",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
        });
        await queryInterface.createTable("bills", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            status: Sequelize.INTEGER,
            applyMonth: Sequelize.DATE,
            totalCost: Sequelize.INTEGER,
            roomId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "rooms",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
        });
        await queryInterface.createTable("billservices", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            startNumber: Sequelize.INTEGER,
            endNumber: Sequelize.INTEGER,
            count: Sequelize.INTEGER,
            totalCost: Sequelize.INTEGER,
            billId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "bills",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
        });

        await queryInterface.createTable("equipments", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: Sequelize.STRING,
            count: Sequelize.INTEGER,
            roomId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "rooms",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
        });
        await queryInterface.createTable("images", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            url: Sequelize.STRING,
            alt: Sequelize.STRING,
            type: Sequelize.INTEGER,
            roomId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "rooms",
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
            billserviceId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "billservices",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("images");
        await queryInterface.dropTable("billservices");
        await queryInterface.dropTable("services");
        await queryInterface.dropTable("equipments");
        await queryInterface.dropTable("bills");
        await queryInterface.dropTable("rooms");
        await queryInterface.dropTable("apartments");
        await queryInterface.dropTable("userprofiles");
        await queryInterface.dropTable("contracts");
        await queryInterface.dropTable("posts");
    },
};
