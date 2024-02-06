const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database.js");
const Category = require("./Category.js");
const Image = require("./Images");
const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  featured: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specification: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    // Foreign key for Category
    type: DataTypes.UUID,
    allowNull: false,
  },
});

// Define the association
  Product.belongsTo(Category, { foreignKey: "categoryId", as:"product_category"});

// Synchronize the model with the database
Category.sync();
Product.sync();

module.exports = Product;
