const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database.js");
const Image = require("./Images"); // Assuming your Images file is named Images.js
const Product = require("./Product")
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

Category.sync();

module.exports = Category;
