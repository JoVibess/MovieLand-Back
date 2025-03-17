const { Router } = require("express");
const { Op } = require("sequelize");
const requireAuth = require("../middlewares/require-auth");
const User = require("../models/User");
const Session = require("../models/Session");
const Movie = require("../models/Movie");
const Room = require("../models/Room");
const Genre = require("../models/Genre");
const Reservation = require("../models/Reservation");

const router = Router();

// Route pour récupérer tous les films avec leurs séances
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
    console.error(error);
    res.status(500).send({ error: "Erreur lors de la récupération des films" });
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
    console.error(error);
    res.status(500).send({
      error: "Erreur lors de la récupération des films pour cette date",
    });
  }
});

// Route pour récupérer les films à une date et une heure précise
router.get("/movies/:date/:time", async (req, res) => {
  try {
    const { date, time } = req.params;

    // Vérification du format de l'heure HHhMM
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
        show_time: time,
      },
    });

    res.send(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: "Erreur lors de la récupération des films pour cette date et heure",
    });
  }
});

// Route pour récupérer les films d'une date, une heure et un genre donné
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
              where: { name: genre },
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
    console.error(error);
    res.status(500).send({ error: "Erreur lors de la récupération des films" });
  }
});

module.exports = router;
