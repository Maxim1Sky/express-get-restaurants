const Sequelize = require("sequelize");
const db = require("../db/connection");
const { DataTypes, Model } = require("sequelize");

class Item extends Model {}

Item.init(
  {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.NUMBER,
    vegetarian: DataTypes.BOOLEAN,
  },
  {
    sequelize: db,
    modelName: "Item",
    freezeTableName: true,
  }
);

module.exports = Item;
