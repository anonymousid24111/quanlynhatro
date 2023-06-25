'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('userprofile', {
      username: Sequelize.STRING,
      password: Sequelize.STRING,
      phone: Sequelize.STRING,
      role: Sequelize.INTEGER,
  });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('userprofile');
     */
    await queryInterface.dropTable('users');
  }
};
