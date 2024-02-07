const Category = require("../models/Category");
const dotenv = require("dotenv");
const Categoryimage = require("../models/Categoryimage");
dotenv.config();

// Create a new category
async function createCategory(req, res) {
  try {
    const { name, images } = req.body;

    const newCategory = await Category.create({ name });

    const imageRecord = await Categoryimage.create({
      ...images[0],
      categoryId: newCategory.id,
    });

    if (newCategory && imageRecord) {
      res
        .status(201)
        .json({ message: "Category and images created successfully" });
    } else {
      res.status(500).json({ message: "Category creation failed" });
    }
  } catch (error) {
    console.error("Error during category creation:", error);
    res
      .status(500)
      .json({ message: "An error occurred during category creation" });
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
