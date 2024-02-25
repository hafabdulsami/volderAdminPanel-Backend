const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database.js");
const SocialMedia = sequelize.define("SocialMedia", {
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
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
SocialMedia.sync();

module.exports = SocialMedia;
