const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database.js");
const Productimage = require("../models/Productimage.js");
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

Product.hasMany(Productimage, {
  foreignKey: "productId", // References the productId field in Productimage
  // Specifies the name of the association
});
Product.sync();

module.exports = Product;
