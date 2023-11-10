const Sequelize = require("sequelize");
const db = require("../db/connection");

const Menu = db.define(
  "Menu",
  {
    title: Sequelize.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = Menu;
