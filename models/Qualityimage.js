const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database.js");
const Qualityimage = sequelize.define("Qualityimage", {
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
  qualityId: {
    // Foreign key for Category
    type: DataTypes.UUID,
    allowNull: false,
  }
});



// Synchronize the model with the database
Qualityimage.sync();

module.exports = Qualityimage;
