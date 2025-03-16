require("dotenv").config();
require("express-async-errors");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./src/utils/sequelize");

// 🔹 Importer les modèles pour s'assurer qu'ils sont bien chargés
require("./src/models/Movie");
require("./src/models/Genre");
require("./src/models/Movie_genre");

const app = express();
const router = express.Router();

async function main() {
  try {
    // 🔹 Synchronisation avec la base de données
    // await sequelize.sync({ alter: true }); // ⚠️ Ne pas activer `alter: true` en production

    // 🔹 Middleware
    app.use(cors()); // Sécuriser CORS si besoin
    app.use(bodyParser.json());

    // 🔹 Routes
    app.use("/api", router);
    require("./src/controllers")(app, router);

    // 🔹 Gestion des erreurs
    app.use((error, req, res, next) => {
      console.error("❌ Internal Server Error:", error);
      res.status(500).json({
        code: "SERVER_ERROR",
        message: "Internal Server Error",
      });
    });

    // 🔹 Démarrer le serveur
    const port = process.env.APP_PORT || 3000;
    app.listen(port, () => {
      console.log(`✅ API running at http://localhost:${port}`);
    });

  } catch (err) {
    console.error("❌ Error during server startup:", err);
  }
}

// 🔹 Gestion des erreurs globales
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
});

main();




// require("dotenv").config();
// const sequelize = require("./src/utils/sequelize");
// require("express-async-errors");

// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const app = express();
// const router = express.Router();

// async function main() {
//   // await sequelize.sync({
//   //   alter: true,
//   // });

//   app.use(cors());
//   app.use(bodyParser.json());
//   app.use("/api", router);

//   require("./src/controllers")(app, router);

//   app.use((error, req, res, next) => {
//     console.log(error);
//     res.status(500).send({
//       code: "SERVER_ERRROR",
//       message: "Internal Server Error",
//     });
//   });

//   app.listen(process.env.APP_PORT, () => {
//     console.log(`Api listening at http://localhost:${process.env.APP_PORT}`);
//   });
// }

// main();
