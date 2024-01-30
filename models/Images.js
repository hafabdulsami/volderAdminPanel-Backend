const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database.js");
const Category = require("./Category.js");
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
        return this.getDataValue('preview').toString(); // or whatever encoding is right
      }
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
    allowNull: false,
  },
});

// Define the association
Image.associate = (models) => {
  Image.belongsTo(Category, { foreignKey: "categoryId" });
};

// Synchronize the model with the database
Image.sync();

module.exports = Image;
