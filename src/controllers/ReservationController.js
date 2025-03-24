const { Router } = require("express");
const { Op } = require("sequelize");
const requireAuth = require("../middlewares/require-auth");
const User = require("../models/User");
const Session = require("../models/Session");
const Reservation = require("../models/Reservation");
const Room = require("../models/Room");
const Movie = require("../models/Movie");

/**
 * @param {Express.Application} app
 * @param {Router} router
 */
module.exports = function (app, router) {
  router.get("/reservations/:session_id", requireAuth, async (req, res) => {
    try {
      const session = req.params.session_id;
      if (!session) {
        return res.status(401).send({ error: "Utilisateur non authentifié" });
      }

      const reservations = await Reservation.findAll({
        include: [{ model: User }, { model: Session, where: { id: session } }],
      });

      res.send(reservations);
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations:", error);
      res.status(500).send({ error: "Erreur serveur" });
    }
  });
  router.get("/reserva/me", requireAuth, async (req, res) => {
    try {
      console.log(req.user.id);

      const userId = req.user.id;

      if (!userId) {
        return res.status(401).send({ error: "Utilisateur non authentifié" });
      }

      const reservations = await Reservation.findAll({
        where: { user_id: 15 },
        include: [
          { model: User },

          { model: Session, include: [{ model: Room }, { model: Movie }] },
        ],
      });

      res.send(reservations);
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations:", error);
      res.status(500).send({ error: "Erreur serveur" });
    }
  });

  router.post("/reservation", requireAuth, async (req, res) => {
    try {
      const { session_id, row_number, seat_number } = req.body;
      const user_id = req.user.id; // Récupéré automatiquement grâce à requireAuth

      if (!session_id || !row_number || !seat_number) {
        return res.status(400).send({ error: "Données incomplètes" });
      }

      // Vérifier si la place est déjà réservée
      const existReservation = await Reservation.findOne({
        where: { session_id, row_number, seat_number },
      });

      if (existReservation) {
        return res.status(400).send({ error: "Cette place est déjà réservée" });
      }

      // Création de la réservation
      const reservation = await Reservation.create({
        user_id,
        session_id,
        row_number,
        seat_number,
      });

      res.status(201).send(reservation);
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
      res.status(500).send({ error: "Erreur serveur" });
    }
  });
};
