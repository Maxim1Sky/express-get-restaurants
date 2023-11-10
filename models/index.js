const Restaurant = require("./Restaurant");
const Menu = require("./Menu");
const Item = require("./Item");

Restaurant.hasMany(Menu);
Menu.belongsTo(Restaurant);

Menu.belongsToMany(Item, { through: menuItems });
Item.belongsToMany(Menu, { through: menuItems });

module.exports = { Restaurant, Menu, Item };
