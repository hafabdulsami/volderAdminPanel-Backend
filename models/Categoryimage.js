const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database.js");
const Category = require("./Category.js");
const Categoryimage = sequelize.define("Categoryimage", {
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
    type: DataTypes.STRING,
    allowNull: false,
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
  }
});



// Synchronize the model with the database
Categoryimage.sync();

module.exports = Categoryimage;
