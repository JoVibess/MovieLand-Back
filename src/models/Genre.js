const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/sequelize");

class Genre extends Model {} 

Genre.init(
  {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Genre",
    tableName: "genres", // Assure-toi que c'est le nom correct
  }
);

module.exports = Genre;




