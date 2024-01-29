const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database.js");

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },

  Name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  ImageName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Images: {
    type: DataTypes.BLOB("medium"),
    allowNull: false,
  },
});

// Create the table if it doesn't exist
Category.sync();

module.exports = Category;
