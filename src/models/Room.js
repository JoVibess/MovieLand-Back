const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/sequelize");

class Room extends Model {} 

Room.init(
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    rows_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seats_per_row: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Room",
    tableName: "rooms", // Assure-toi que c'est le nom correct
  }
);

module.exports = Room;




