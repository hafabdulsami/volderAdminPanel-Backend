const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database.js");
const Qualityimage = require("./Qualityimage.js");
const Quality = sequelize.define("Quality", {
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
Quality.hasMany(Qualityimage ,{ foreignKey: 'qualityId'});
Quality.sync();

module.exports = Quality;
