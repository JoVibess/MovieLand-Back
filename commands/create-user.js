require("dotenv").config();
require("../src/utils/sequelize");

const prompts = require("prompts");
const User = require("../src/models/User");

async function main() {
  const questions = [
    {
      type: "text",
      name: "email",
      message: "What is your email ?",
    },
    {
      type: "password",
      name: "password",
      message: "What is your password ?",
    },
  ];

  const response = await prompts(questions);
  //@todo a hasher le password + rajouter champs si necessaire
  const user = await User.create({
    email: response.email,
    password: response.password,
    role: "ADMIN",
  });
  console.log("user created", user);
}

main();
