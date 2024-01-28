const Category = require("../models/Category");
const dotenv = require("dotenv");
dotenv.config();

// Create a new user
async function createCategory(req, res) {
  try {
    const newCategory = await Category.create(req.body);

    if (newCategory) {
      res.status(201).json({ message: "Category created successfully" });
    } else {
      res.status(500).json({ error: "Category creation failed" });
    }
  } catch (error) {
    var errorText = error.errors[0].message;
    console.log(errorText);

    if (errorText === "name must be unique") {
      return res.status(500).json({ error: "Category already exists" });
    }

    res
      .status(500)
      .json({ error: "An error occurred during Category creation" });
  }
}

module.exports = { createCategory };
