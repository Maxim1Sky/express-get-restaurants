// const { Restaurant, Menu, Item } = require("./models/index");
const Restaurant = require("./models/Restaurant");
const Menu = require("./models/Menu");
const Item = require("./models/Item");
const { seedRestaurant, seedMenu, seedItem } = require("./seedData");
const db = require("./db/connection");

const syncSeed = async () => {
  await db.sync({ force: true });
  await Restaurant.bulkCreate(seedRestaurant);
  // BONUS: Update with Item and Menu bulkCreate
  await Menu.bulkCreate(seedMenu);
  await Item.bulkCreate(seedItem);
};

//syncSeed();

module.exports = syncSeed;
