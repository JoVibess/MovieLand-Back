const { Router } = require("express");
const { Op } = require("sequelize");
const requireAuth = require("../middlewares/require-auth");
const User = require("../models/User");
const Session = require("../models/Session");
const Movie = require("../models/Movie");
const Room = require("../models/Room");
const Genre = require("../models/Genre");
const Reservation = require("../models/Reservation");

/**
 * @param {Express.Application} app
 * @param {Router} router
 */
module.exports = function (app, router) {
  // router.get("/movies", async (req, res) => {
  //   // res.send(
  //   //   await Session.findAll({
  //   //     include: [
  //   //       {
  //   //         model: Movie,
  //   //         required: true,
  //   //         include: [
  //   //           {
  //   //             model: Genre,
  //   //             required: true,
  //   //             through: { attributes: [] },
  //   //           },
  //   //         ],
  //   //       },
  //   //       { model: Room, required: true },
  //   //     ],
  //   //   })
  //   // );
  //   const date = req.query.date;
  //   const movies = await Movie.findAll({
  //     include: [
  //       {
  //         model: Session,
  //         as: "sessions",
  //         where: {
  //           start_time: {
  //             [Op.gte]: new Date(`${date}T00:00:00`),
  //             [Op.lt]: new Date(`${date}T23:59:59`),
  //           },
  //         },
  //         attributes: ["start_time"],
  //         order: [["start_time", "ASC"]],
  //       },
  //     ],
  //   });
  //   res.send(movies);
  // });

  // Route pour récupérer les films à une date et une heure précise
  router.get("/movies", async (req, res) => {
    const date = req.query.date;
    res.send(
      await Movie.findAll({
        include: [
          // {
          //   model: Genre,
          //   required: true,
          //   through: { attributes: [] },
          //   as: "genres",
          // },
          {
            model: Session,
            where: {
              start_time: {
                [Op.gte]: new Date(`${date}T00:00:00`),
                [Op.lt]: new Date(`${date}T23:59:59`),
              },
            },
            required: true,
            as: "sessions",
            include: [{ model: Room, required: true }],
          },
        ],
      })
    );
  });

  router.get("/session/:session_id", requireAuth, async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).send({ error: "Utilisateur non authentifié" });
      }

      const sessionId = req.params.session_id;

      const session = await Session.findByPk(sessionId, {
        include: [
          {
            model: Movie,
            required: true,
            include: [
              { model: Genre, as: "genres", through: { attributes: [] } },
            ],
          },
          { model: Room, required: true },
        ],
      });

      if (!session) {
        return res.status(404).send({ error: "Session non trouvée" });
      }

      const { rows_count, seats_per_row } = session.Room;
      const totalSeats = rows_count * seats_per_row;

      const reservations = await Reservation.findAll({
        where: { session_id: sessionId },
        attributes: ["seat_number"],
      });

      const reservedSeats = reservations.map((res) => res.seat_number);

      // Générer toutes les places disponibles
      let availableSeats = [];
      for (let row = 1; row <= rows_count; row++) {
        for (let seat = 1; seat <= seats_per_row; seat++) {
          const seatNumber = `${row}-${seat}`;
          if (!reservedSeats.includes(seatNumber)) {
            availableSeats.push(seatNumber);
          }
        }
      }

      res.send({
        session_id: sessionId,
        movie: session.Movie,
        room: session.Room,
        totalSeats,
        reservedSeats,
        availableSeats,
      });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations de session:",
        error
      );
      res.status(500).send({ error: "Erreur serveur" });
    }
  });
};
