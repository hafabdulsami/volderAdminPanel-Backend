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

module.exports = { createCategory };
