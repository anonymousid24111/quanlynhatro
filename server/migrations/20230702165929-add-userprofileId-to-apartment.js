module.exports = {
    up: async (queryInterface, Sequelize) => {
        // await queryInterface.addColumn("apartments", "userprofileId", {
        //     type: Sequelize.INTEGER,
        //     allowNull: true,
        //     references: {
        //         model: "userprofiles",
        //         key: "id",
        //     },
        //     onUpdate: "CASCADE",
        //     onDelete: "CASCADE",
        // });
    },

    down: async (queryInterface, Sequelize) => {
        // await queryInterface.removeColumn("apartments", "userprofileId");
    },
};
