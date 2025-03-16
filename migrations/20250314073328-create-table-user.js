"use strict";

// Pour migrer :

const USER_ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
};


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      role: {
        type: Sequelize.ENUM(Object.values(USER_ROLES)),
        allowNull: false,
        defaultValue: USER_ROLES.USER,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('users');
  },
};
