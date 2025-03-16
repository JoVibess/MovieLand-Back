const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/sequelize");
const Reservation = require("./Reservation");

class Tarif extends Model {}

Tarif.init(
  {
    reservation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Reservation,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 8,
        max: 15,
      },
    },
  },
  {
    sequelize,
    modelName: "Tarif",
    tableName: "tarifs",
  }
);

module.exports = Tarif;