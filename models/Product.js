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
  describtion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  featured: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specifiction: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoryId: {
    // Foreign key for Category
    type: DataTypes.UUID,
    allowNull: false,
  },
});

// Define the association
Product.associate = (models) => {
  Product.belongsTo(Category, { foreignKey: "categoryId" });
  Product.hasMany(Image, { foreignKey: "productId" });
};

// Synchronize the model with the database
Product.sync();

module.exports = Product;
