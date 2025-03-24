const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/sequelize");
const USER_ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
};

class User extends Model {
  toJSON() {
    return {
      role: this.role,
      email: this.email,
    };
  }
}

User.init(
  {
    role: {
      type: DataTypes.ENUM(Object.values(USER_ROLES)),
      allowNull: false,
      defaultValue: USER_ROLES.USER,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users", // Assure-toi que c'est le nom correct
  }
);



module.exports = User;
module.exports.USER_ROLES = USER_ROLES;
