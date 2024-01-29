const Category = require("../models/Category");
const dotenv = require("dotenv");
dotenv.config();

// Create a new category
async function createCategory(req, res) {
  try {
    const newCategory = await Category.create(req.body);

    if (newCategory) {
      res.status(201).json({ message: "Category created successfully" });
    } else {
      res.status(500).json({ error: "Category creation failed" });
    }
  } catch (error) {
    if (error.errors && error.errors.length > 0) {
      var errorText = error.errors[0].message;
      console.log(errorText);

      if (errorText === "name must be unique") {
        return res.status(500).json({ error: "Category already exists" });
      }
    }
    console.error("Error during category creation:", error);
    res
      .status(500)
      .json({ error: "An error occurred during category creation" });
  }
}

async function getCategory(req, res) {
  const { id } = req.query;

  if (id) {
    try {
      const category = await Category.findByPk(id);
      if (category) {
        return res.status(200).json({ category });
      } else {
        return res.status(404).json({ error: "Category not found" });
      }
    } catch (error) {
      console.error("Error during category retrieval:", error);
      return res
        .status(500)
        .json({ error: "An error occurred during category retrieval" });
    }
  }

  try {
    const categoryList = await Category.findAll();
    return res.status(200).json({ categoryList });
  } catch (error) {
    console.error("Error during category list retrieval:", error);
    return res
      .status(500)
      .json({ error: "An error occurred during category list retrieval" });
  }
}
module.exports = { createCategory, getCategory };
