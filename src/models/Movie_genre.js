const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/sequelize");
const Movie = require("./Movie");
const Genre = require("./Genre");

class Movie_genre extends Model {}

Movie_genre.init(
  {
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Movie,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Genre,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Movie_genre",
    tableName: "movies_genres",
    timestamps: false, // Désactive `createdAt` et `updatedAt` pour une table pivot
  }
);

module.exports = Movie_genre;
