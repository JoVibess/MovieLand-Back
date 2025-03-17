const { Router } = require("express");
const requireAuth = require("../middlewares/require-auth");
const User = require("../models/User");

const router = Router();

// Route pour récupérer un utilisateur par son ID
router.get("/user/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si l'ID est un nombre valide
    if (isNaN(id)) {
      return res.status(400).send({ error: "ID utilisateur invalide" });
    }

    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] }, // Exclure mdp pour sécu
    });

    if (!user) {
      return res.status(404).send({ error: "Utilisateur non trouvé" });
    }

    res.send(user);
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).send({ error: "Erreur lors de la récupération de l'utilisateur" });
  }
});

module.exports = router;
