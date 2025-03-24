const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/sequelize");
const Room = require("./Room");

class Session extends Model {}

Session.init(
  {
    // movie_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Movie,
    //     key: "id",
    //   },
    // },
    // room_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Room,
    //     key: "id",
    //   },
    // },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Session",
    tableName: "sessions",
  }
);

Session.belongsTo(Room, { foreignKey: "room_id" });

module.exports = Session;
