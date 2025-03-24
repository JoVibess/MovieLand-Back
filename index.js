require("dotenv").config();
const sequelize = require("./src/utils/sequelize");
require("express-async-errors");
require("./src/models");
async function main() {
  await sequelize.sync({ alter: true });
}
main();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", router);

require("./src/controllers")(app, router);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send({
    code: "SERVER_ERRROR",
    message: "Internal Server Error",
  });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Api listening at http://localhost:${process.env.APP_PORT}`);
});
