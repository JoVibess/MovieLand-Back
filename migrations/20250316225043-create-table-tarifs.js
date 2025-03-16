"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tarifs", {
      reservation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "reservations",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 8,
          max: 15,
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tarifs");
  },
};
