const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/sequelize");
const Movie = require("./Movie");
const Room = require("./Room");

class Session extends Model {}

Session.init(
  {
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Movie,
        key: "id",
      },
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Room,
        key: "id",
      },
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    show_time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^([01]?[0-9]|2[0-3])H([0-5][0-9])$/, // Format HHhMM
      },
    },
  },
  {
    sequelize,
    modelName: "Session",
    tableName: "sessions",
  }
);

module.exports = Session;