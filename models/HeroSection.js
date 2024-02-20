const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database.js");
const HeroSection = sequelize.define("HeroSection", {
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
  productId: {
    // Foreign key for Category
    type: DataTypes.UUID,
    allowNull: true,
  },
});

// Define the association


// Synchronize the model with the database
HeroSection.sync();

module.exports = HeroSection;
