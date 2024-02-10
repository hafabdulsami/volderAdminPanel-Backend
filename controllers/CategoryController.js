const Category = require("../models/Category");
const dotenv = require("dotenv");
const Categoryimage = require("../models/Categoryimage");
const sequelize = require("../utils/database.js");
dotenv.config();

// Create a new category
async function createCategory(req, res) {
  try {
    const { originalname, path, size, mimetype } = req.files[0];
    const { name } = req.body;
    if (!req.files) {
      return res.status(400).json({ message: "Image is not uploaded" });
    }

    const t = await sequelize.transaction();

    try {
      console.log(req.files);
      // Create a new category
      const newCategory = await Category.create({ name }, { transaction: t });

      // Create a new category image record
      const imageRecord = await Categoryimage.create({
        name: originalname,
        path: path,
        preview: process.env.Images_location + originalname,
        size: size,
        type: mimetype,
        categoryId: newCategory.id,
      }, { transaction: t });

      // Commit the transaction if both operations are successful
      await t.commit();

      return res.status(201).json({ message: "Category and images created successfully" });
    } catch (error) {
      // Rollback the transaction if there's an error
      await t.rollback();
      console.error("Error during category creation:", error);
      return res.status(500).json({ message: "An error occurred during category creation" });
    }
  } catch (error) {
    console.error("Error during category creation:", error);
    return res.status(500).json({ message: "An error occurred during category creation" });
  }
}

async function editCategory(req, res) {
  const { id, name, images } = req.body;

  if (id) {
    try {
      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: "Category not found." });
      }

      if (name) {
        category.name = name;
        await category.save();
      }

      const existingImage = await Categoryimage.findOne({
        where: { categoryId: id },
      });

      if (existingImage) {
        await existingImage.update({ ...images[0] });
      } else {
        await Categoryimage.create({
          ...images[0],
          categoryId: id,
        });
      }

      return res
        .status(200)
        .json({ message: "Category and images updated successfully." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error." });
    }
  } else {
    return res.status(500).json({ message: "id is empty" });
  }
}

async function getCategory(req, res) {
  const { id } = req.query;

  if (id) {
    try {
      const category = await Category.findByPk(id, { include: Categoryimage });
      if (category) {
        return res.status(200).json({
          category,
        });
      } else {
        return res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      console.error("Error during category retrieval:", error);
      return res
        .status(500)
        .json({ message: "An error occurred during category retrieval" });
    }
  }

  try {
    const categoryList = await Category.findAll({ include: Categoryimage });
    return res.status(200).json({ categoryList });
  } catch (error) {
    console.error("Error during category list retrieval:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during category list retrieval" });
  }
}

module.exports = { createCategory, getCategory, editCategory };
