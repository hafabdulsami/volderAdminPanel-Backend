const Quality = require("../models/Quality");
const dotenv = require("dotenv");
const Qualityimage = require("../models/Qualityimage");
const sequelize = require("../utils/database.js");
const fs = require("fs").promises;
dotenv.config();

// Create a new Quality
async function createQuality(req, res) {
  try {
    const { path, size, mimetype, originalname, filename } = req.files[0];
    const { name,description } = req.body;
    if (!req.files) {
      return res.status(400).json({ message: "Image is not uploaded" });
    }

    const t = await sequelize.transaction();

    try {
      // Create a new Quality
      const newQuality = await Quality.create({ name,description }, { transaction: t });

      // Create a new Quality image record
      await Qualityimage.create(
        {
          name: originalname,
          path: path,
          preview: process.env.Images_location + filename,
          size: size,
          type: mimetype,
          QualityId: newQuality.id,
        },
        { transaction: t }
      );

      // Commit the transaction if both operations are successful
      await t.commit();

      return res
        .status(201)
        .json({ message: "Quality and images created successfully" });
    } catch (error) {
      // Rollback the transaction if there's an error
      await t.rollback();
      console.error("Error during Quality creation:", error);
      return res
        .status(500)
        .json({ message: "An error occurred during Quality creation" });
    }
  } catch (error) {
    console.error("Error during Quality creation:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during Quality creation" });
  }
}

async function editQuality(req, res) {
  const { id, name, description } = req.body;
  if (id) {
    try {
      const quality = await Quality.findByPk(id);

      if (!quality) {
        return res.status(404).json({ message: "Quality not found." });
      }

      quality.name = name;
      quality.description = description;
      await quality.save();
      if (req.files?.length ? true : false) {
        const existingImage = await Qualityimage.findOne({
          where: { qualityId: id },
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
            qualityId: id,
          });
        }
      }
      return res
        .status(200)
        .json({ message: "Quality and images updated successfully." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error." });
    }
  } else {
    return res.status(500).json({ message: "id is empty" });
  }
}

async function getQuality(req, res) {
  const { id } = req.query;

  if (id) {
    try {
      const Quality = await Quality.findByPk(id, { include: Qualityimage });
      if (Quality) {
        return res.status(200).json({
          Quality,
        });
      } else {
        return res.status(404).json({ message: "Quality not found" });
      }
    } catch (error) {
      console.error("Error during Quality retrieval:", error);
      return res
        .status(500)
        .json({ message: "An error occurred during Quality retrieval" });
    }
  }

  try {
    const qualityList = await Quality.findAll({ include: Qualityimage });
    return res.status(200).json({ qualityList });
  } catch (error) {
    console.error("Error during Quality list retrieval:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during Quality list retrieval" });
  }
}

module.exports = { createQuality, getQuality, editQuality };
