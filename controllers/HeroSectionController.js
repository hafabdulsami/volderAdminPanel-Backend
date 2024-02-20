const dotenv = require("dotenv");
const HeroSection = require("../models/HeroSection.js");
const sequelize = require("../utils/database.js");
const fs = require("fs").promises;
dotenv.config();

async function createHeroSection(req, res) {
  try {
    const { path, size, mimetype, originalname, filename } = req.files[0];
    if (!req.files) {
      return res.status(400).json({ message: "Image is not uploaded" });
    }

    try {
      // Create a new category image record
      await HeroSection.create({
        name: originalname,
        path: path,
        preview: process.env.Images_location + filename,
        size: size,
        type: mimetype,
        categoryId: newCategory.id,
      });

      // Commit the transaction if both operations are successful

      return res
        .status(201)
        .json({ message: "Category and images created successfully" });
    } catch (error) {
      // Rollback the transaction if there's an error
      console.error("Error during category creation:", error);
      return res
        .status(500)
        .json({ message: "An error occurred during category creation" });
    }
  } catch (error) {
    console.error("Error during category creation:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during category creation" });
  }
}

module.exports = { createHeroSection };
