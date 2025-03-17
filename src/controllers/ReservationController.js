const { Router } = require("express");
const { Op } = require("sequelize");
const requireAuth = require("../middlewares/require-auth");
const User = require("../models/User");
const Session = require("../models/Session");
const Reservation = require("../models/Reservation");

const router = Router();

// Récupérer toutes les réservations (uniquement pour utilisateurs connectés)
router.get("/reservation", requireAuth, async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: [{ model: User }, { model: Session }],
    });
    res.send(reservations);
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).send({ error: "Erreur lors de la récupération des réservations" });
  }
});

// Vérifier si une place est déjà réservée
router.get("/reservation/:place", requireAuth, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).send({ error: "Utilisateur non authentifié" });
    }

    const { place } = req.params;

    // Vérifier si la place est déjà réservée
    const reservation = await Reservation.findOne({
      where: { seat_number: place },
      include: [{ model: User }, { model: Session }],
    });

    if (reservation) {
      return res.status(400).send({ error: "Cette place est déjà réservée" });
    }

    res.send({ message: "Cette place est disponible" });
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).send({ error: "Erreur lors de la vérification de la réservation" });
  }
});

module.exports = router;
