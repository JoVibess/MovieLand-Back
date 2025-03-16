"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sessions", {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "movies",
          key: "id",
        },
      },
      room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "rooms",
          key: "id",
        },
      },
      start_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      show_time: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^([01]?[0-9]|2[0-3])H([0-5][0-9])$/, // Format HHhMM
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("sessions");
  },
};
