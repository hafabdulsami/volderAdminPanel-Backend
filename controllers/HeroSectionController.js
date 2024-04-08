const dotenv = require("dotenv");
const HeroSection = require("../models/HeroSection.js");
const fs = require("fs").promises;
dotenv.config();

async function createHeroSection(req, res) {
  try {
    const { path, size, mimetype, originalname, filename } = req.files[0];
    if (!req.files) {
      return res.status(400).json({ message: "Image is not uploaded" });
    }

    try {
      // Create a new image image record
      await HeroSection.create({
        name: originalname,
        path: path,
        preview: process.env.Images_location + filename,
        size: size,
        type: mimetype,
      });

      // Commit the transaction if both operations are successful

      return res
        .status(201)
        .json({ message: "images created successfully" });
    } catch (error) {
      // Rollback the transaction if there's an error
      console.error("Error during image creation:", error);
      return res
        .status(500)
        .json({ message: "An error occurred during image creation" });
    }
  } catch (error) {
    console.error("Error during image creation:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during Image creation" });
  }
}

async function getheroSection(req, res) {
  const { id } = req.query;

  if (id) {
    try {
      const heroSection = await HeroSection.findByPk(id);
      if (heroSection) {
        return res.status(200).json({
          heroSection,
        });
      } else {
        return res.status(404).json({ message: "image not found" });
      }
    } catch (error) {
      console.error("Error during image retrieval:", error);
      return res
        .status(500)
        .json({ message: "An error occurred during image retrieval" });
    }
  }

  try {
    const heroSectionList = await HeroSection.findAll();
    return res.status(200).json({ heroSectionList });
  } catch (error) {
    console.error("Error during image list retrieval:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during image list retrieval" });
  }
}

async function editHeroSection(req, res) {
  const { id, name } = req.body;
  if (id) {
    try {
      if (req.files?.length ? true : false) {
        const existingImage = await HeroSection.findOne({
          where: { id: id },
        });
        if (existingImage && existingImage.path) {
          try {
            await fs.unlink(existingImage.path);
            console.log("Previous file deleted successfully.");
          } catch (deleteError) {
            console.error("Error deleting previous file:", deleteError);
          }
        }
        if (existingImage) {
          await existingImage.update({
            name: req.files[0].originalname,
            path: req.files[0].path,
            preview: process.env.Images_location + req.files[0].filename,
            size: req.files[0].size,
            type: req.files[0].mimetype,
            imageId: id,
          });
        }
      }
      return res
        .status(200)
        .json({ message: "image and images updated successfully." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error." });
    }
  } else {
    return res.status(500).json({ message: "id is empty" });
  }
}

module.exports = { createHeroSection, getheroSection, editHeroSection };
