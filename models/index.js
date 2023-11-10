const Restaurant = require("./Restaurant.js");
const Menu = require("./Menu.js");
const Item = require("./Item.js");

const syncSeed = require("../seed");

Restaurant.hasMany(Menu);
Menu.belongsTo(Restaurant);

Menu.belongsToMany(Item, { through: "menuItems" });
Item.belongsToMany(Menu, { through: "menuItems" });

async function main() {
  // await slythHouse.setUsers([malfoy, tom]);
  // await houseName.getUsers() <----- theoretically can be used
  // const houseMembers = await House.findOne({
  //   where: { name: "Slytherin" },
  //   include: User,
  // });

  await syncSeed();

  const theRest = await Restaurant.findByPk(1);
  const theMenu = await Menu.findByPk(1);
  const allItems = await Item.findAll();

  theRest.setMenus(theMenu);
  theMenu.setItems(allItems);
}

main();

module.exports = { Restaurant, Menu, Item };
