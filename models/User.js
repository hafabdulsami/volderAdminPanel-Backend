const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database.js");

const User = sequelize.define("User", {
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
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phonenumber: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true,
  },
});
// Define the association
User.sync();

module.exports = User;
