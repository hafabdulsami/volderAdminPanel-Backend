const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database.js");
const Category = require("./Category.js");
const Product = require("./Product");
const Image = sequelize.define("Image", {
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
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preview: {
    type: DataTypes.BLOB("medium"),
    allowNull: false,
    get() {
      return this.getDataValue("preview").toString(); // or whatever encoding is right
    },
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    // Foreign key for Category
    type: DataTypes.UUID,
    allowNull: true,
  },
  productId: {
    // Foreign key for Category
    type: DataTypes.UUID,
    allowNull: true,
  },
});

// Define the association
Image.belongsTo(Category, { foreignKey: "categoryId",as:"category" });
Image.belongsTo(Product, { foreignKey: "productId", as:"product" });


// Synchronize the model with the database
Category.sync()
Product.sync()
Image.sync();

module.exports = Image;
