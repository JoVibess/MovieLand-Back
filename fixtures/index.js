require("dotenv").config();
const sequelize = require("../src/utils/sequelize");
const Movie = require("../src/models/Movie");
const Room = require("../src/models/Room");
const Session = require("../src/models/Session");
const Movie_genre = require("../src/models/Movie_genre");
const Genre = require("../src/models/Genre");

// async function main() {
//   const movie = await Movie.create({
//     title: "Pirates of the Caribbean: The Curse of the Black Pearl",
//     duration: 143,
//     poster:
//       "https://www.ed92.org/wp-content/uploads/2021/08/pirates-des-caraibes-5-photo-521b230a77246-780x488.jpg",
//     description:
//       "Set in the Caribbean Sea in the 17th century, gentleman buccaneer Jack Sparrow's idyllic life is turned upside down when his enemy, the treacherous Captain Barbossa, steals his ship, the Black Pearl, then attacks the town of Port Royal, kidnapping the governor's beautiful daughter, Elizabeth Swann, in the process. Her childhood friend, Will Turner, joins Jack in pursuit of the captain.",
//   });
//   const room = await Room.create({
//     name: "Salle 1",
//     rows_count: 8,
//     seats_per_row: 15,
//   });
//   const session = await Session.create({
//     start_time: new Date("2025-03-23T15:30:00.000Z"),
//     movie_id: movie.id,
//     room_id: room.id,
//   });
//   const genre = await Genre.create({
//     name: "action",
//   });
//   const movie_genre = await Movie_genre.create({
//     genre_id: genre.id,
//     movie_id: movie.id,
//   });
// }

main();
async function main() {
  const movie = await Movie.create({
    title: "The Phantom Menace",
    duration: 143,
    poster:
      "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/EF0A0EE8806940F08C7B3C44319B03BF0A05FCED788A9A7F425FBAF718E76F09/scale?width=1200&aspectRatio=1.78&format=webp",
    description:
      "Before he became a famous Jedi knight, and long before he revealed himself to be the darkest soul in the galaxy, Anakin Skywalker was a young slave on the planet Tatooine. The Force is already strong within him and he is a remarkable Podracer pilot. Jedi Master Qui-Gon Jinn discovers him and glimpses his immense potential.",
  });
  const room = await Room.create({
    name: "Salle 2",
    rows_count: 8,
    seats_per_row: 15,
  });
  const session = await Session.create({
    start_time: new Date("2025-03-26T16:30:00.000Z"),
    movie_id: movie.id,
    room_id: room.id,
  });
  const genre = await Genre.create({
    name: "science fiction",
  });
  const movie_genre = await Movie_genre.create({
    genre_id: genre.id,
    movie_id: movie.id,
  });
}

main();

// async function main() {
//   const movie = await Movie.create({
//     title: "Pirates of the Caribbean: Secret of the Cursed Chest",
//     duration: 151,
//     poster:
//       "https://www.ed92.org/wp-content/uploads/2021/08/pirates-des-caraibes-5-photo-521b230a77246-780x488.jpg",
//     description:
//       "In this latest instalment of the Pirates of the Caribbean adventure, the eccentric pirate Jack Sparrow is suddenly confronted with his past. Thirteen years ago, Jack signed a pact with Davey Jones, the master of the seven seas, whose evil spirit is matched only by his tentacular appearance. In exchange for his soul, Jones promised him command of the mythical Black Pearl...",
//   });
//   const room = await Room.create({
//     name: "Salle 2",
//     rows_count: 8,
//     seats_per_row: 15,
//   });
//   const session = await Session.create({
//     start_time: new Date("2025-03-21T17:30:00.000Z"),
//     movie_id: movie.id,
//     room_id: room.id,
//   });
//   const genre = await Genre.create({
//     name: "action",
//   });
//   const movie_genre = await Movie_genre.create({
//     genre_id: genre.id,
//     movie_id: movie.id,
//   });
// }

// main();

// Un film, deux séances, une room
