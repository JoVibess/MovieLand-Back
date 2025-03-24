const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/sequelize");
const Movie = require("./Movie");
const Genre = require("./Genre");

class Movie_genre extends Model {}

Movie_genre.init(
  {
    // id: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    //   primaryKey: true,
    //   allowNull: false,
    // },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Movie,
        key: "id",
      },
      // onDelete: "CASCADE",
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Genre,
        key: "id",
      },
      // onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Movie_genre",
    tableName: "movies_genres",
    indexes: [
      {
        unique: true,
        fields: ["movie_id", "genre_id"],
      },
    ],
  }
);

Movie.belongsToMany(Genre, {
  through: Movie_genre,
  as: "genres",
  foreignKey: "movie_id",
  otherKey: "genre_id",
});
Genre.belongsToMany(Movie, {
  through: Movie_genre,
  foreignKey: "genre_id",
  otherKey: "movie_id",
});
module.exports = Movie_genre;
