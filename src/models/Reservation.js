const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/sequelize");
const User = require("./User");
const Session = require("./Session");

class Reservation extends Model {}

Reservation.init(
  {
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: User,
    //     key: "id",
    //   },
    // },
    // session_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Session,
    //     key: "id",
    //   },
    // },
    row_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seat_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Reservation",
    tableName: "reservations", // Assure-toi que c'est le nom correct
  }
);
Reservation.belongsTo(User, { foreignKey: "user_id" });
Reservation.belongsTo(Session, { foreignKey: "session_id" });

module.exports = Reservation;
