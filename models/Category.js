const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database.js");
const Categoryimage = require("./Categoryimage.js");
const Product = require("./Product.js");
const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});
Category.hasMany(Categoryimage ,{ foreignKey: 'categoryid'});
Category.sync();

module.exports = Category;
