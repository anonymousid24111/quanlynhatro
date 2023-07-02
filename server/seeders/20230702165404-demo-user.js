"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("userprofiles", [
            {
                username: "tenant",
                phone: "0987654321",
                password: "$2a$10$R//Wb0f5Yt3WKC36Ecwzs.aG4giC/3Xoubb5ktJGy566RvvfmHl3W",
                role: 1,
            },
            {
                username: "lessor",
                phone: "0987654322",
                password: "$2a$10$R//Wb0f5Yt3WKC36Ecwzs.aG4giC/3Xoubb5ktJGy566RvvfmHl3W",
                role: 2,
            },
            {
                username: "admin",
                phone: "0987654323",
                password: "$2a$10$R//Wb0f5Yt3WKC36Ecwzs.aG4giC/3Xoubb5ktJGy566RvvfmHl3W",
                role: 3,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("userprofiles", null, {});
    },
};
