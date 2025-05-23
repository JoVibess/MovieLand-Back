const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/sequelize");
const Session = require("./Session");

class Movie extends Model {}

Movie.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    poster: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Movie",
    tableName: "movies", // Assure-toi que c'est le nom correct
  }
);
Movie.hasMany(Session, { foreignKey: "movie_id", as: "sessions" });
Session.belongsTo(Movie, { foreignKey: "movie_id" });
module.exports = Movie;
