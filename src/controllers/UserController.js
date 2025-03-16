const { Router } = require("express");
const { Op } = require("sequelize"); // Ajout pour les requêtes Sequelize
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const User = require("../models/User");
const Session = require("../models/Session");
const Movie = require("../models/Movie");
const Room = require("../models/Room");
const Genre = require("../models/Genre");
const Reservation = require("../models/Reservation");
const Tarif = require("../models/Tarif");

const router = Router();

/**
 * @param {Express.Application} app
 * @param {Router} router
 */
module.exports = function (app, router) {
  // Route pour récupérer tous les films
  router.get("/movies", async (req, res) => {
    try {
      const sessions = await Session.findAll({
        include: [
          { model: Movie, required: true },
          { model: Room, required: true },
        ],
      });
      res.send(sessions);
    } catch (error) {
      res
        .status(500)
        .send({ error: "Erreur lors de la récupération des films" });
    }
  });

  // Route pour récupérer les films d'une date spécifique
  router.get("/movies/:date", async (req, res) => {
    try {
      const date = req.params.date;
      const sessions = await Session.findAll({
        include: [
          { model: Movie, required: true },
          { model: Room, required: true },
        ],
        where: {
          start_time: {
            [Op.gte]: new Date(`${date}T00:00:00`),
            [Op.lt]: new Date(`${date}T23:59:59`),
          },
        },
      });
      res.send(sessions);
    } catch (error) {
      res.status(500).send({
        error: "Erreur lors de la récupération des films pour cette date",
      });
    }
  });

  // Route pour récupérer les films à une date et une heure précise
  router.get("/movies/:date/:time", async (req, res) => {
    try {
      const { date, time } = req.params;

      // Vérifier si time est bien au format HHhMM
      if (!/^([01]?[0-9]|2[0-3])H([0-5][0-9])$/.test(time)) {
        return res.status(400).send({
          error: "Format d'heure invalide. Utilisez HHhMM (ex: 21H00)",
        });
      }

      const sessions = await Session.findAll({
        include: [
          { model: Movie, required: true },
          { model: Room, required: true },
        ],
        where: {
          start_time: {
            [Op.gte]: new Date(`${date}T00:00:00`),
            [Op.lt]: new Date(`${date}T23:59:59`),
          },
          show_time: time, // Filtrer directement avec show_time
        },
      });

      res.send(sessions);
    } catch (error) {
      res.status(500).send({
        error:
          "Erreur lors de la récupération des films pour cette date et heure",
      });
    }
  });

  // Films pour une date, une heure et un genre donné
  router.get("/movies/:date/:heure/:genre", async (req, res) => {
    try {
      const { date, heure, genre } = req.params;
      const sessions = await Session.findAll({
        include: [
          {
            model: Movie,
            include: [
              {
                model: Genre,
                where: { name: genre }, // Filtrer par genre
                required: true,
              },
            ],
          },
          { model: Room },
        ],
        where: {
          start_time: {
            [Op.gte]: new Date(`${date}T00:00:00`),
            [Op.lt]: new Date(`${date}T23:59:59`),
          },
          show_time: heure,
        },
      });
      res.send(sessions);
    } catch (error) {
      res
        .status(500)
        .send({ error: "Erreur lors de la récupération des films" });
    }
  });

  // Liste toutes les réservations
  router.get("/reservation", async (req, res) => {
    try {
      const reservations = await Reservation.findAll({
        include: [{ model: User }, { model: Session }],
      });
      res.send(reservations);
    } catch (error) {
      res
        .status(500)
        .send({ error: "Erreur lors de la récupération des réservations" });
    }
  });

  // Récupérer une réservation spécifique par place
  router.get("/reservation/:place", async (req, res) => {
    try {
      const { place } = req.params;
      const reservation = await Reservation.findOne({
        where: {
          seat_number: place,
        },
        include: [{ model: User }, { model: Session }],
      });

      if (!reservation) {
        return res.status(404).send({ error: "Réservation non trouvée" });
      }

      res.send(reservation);
    } catch (error) {
      res
        .status(500)
        .send({ error: "Erreur lors de la récupération de la réservation" });
    }
  });

  router.get("/tarif", async (req, res) => {
    try {
      const tarifs = await Tarif.findAll({ include: Reservation });
      res.json(tarifs);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des tarifs" });
    }
  });
};

module.exports = router;
