const { DataTypes } = require("sequelize");

const sequelize = require("../db/connection");

const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: { type: DataTypes.STRING, default: "user" },
});

module.exports = User;
