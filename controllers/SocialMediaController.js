const SocialMedia = require("../models/SocialMedia.js");
const dotenv = require("dotenv");
const sequelize = require("../utils/database.js");
dotenv.config();
const platforms = ["Facebook", "Twitter", "Instagram"];
// Create a new Social Media
async function createSocialMedia(req, res) {
  try {
    const { name, link } = req.body;

    const t = await sequelize.transaction();
    try {
      const platform = platforms[name-1];
      // Create a new category
      await SocialMedia.create(
        { name: platform, link, value: name },
        { transaction: t }
      );

      await t.commit();

      return res
        .status(201)
        .json({ message: "Social Media created successfully" });
    } catch (error) {
      // Rollback the transaction if there's an error
      await t.rollback();
      console.error("Error during Social Media creation:", error);
      return res
        .status(500)
        .json({ message: "An error occurred during Social Media creation" });
    }
  } catch (error) {
    console.error("Error during Social Media creation:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during Social Media creation" });
  }
}

async function getSocialMedia(req, res) {
  const { id } = req.query;
  console.log(id);
  if (id) {
    try {
      const socialMedia = await SocialMedia.findByPk(id);
      if (socialMedia) {
        // Include the category data in the response
        return res.status(200).json({
          socialMedia,
        });
      } else {
        return res.status(404).json({ message: "Link not found" });
      }
    } catch (error) {
      console.error("Error during Link retrieval:", error);
      return res
        .status(500)
        .json({ message: "An error occurred during link retrieval" });
    }
  }

  try {
    const socialMediaList = await SocialMedia.findAll();
    return res.status(200).json({ socialMediaList: socialMediaList });
  } catch (error) {
    console.error("Error during link list retrieval:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during link list retrieval" });
  }
}

async function editSocialMedia(req, res) {
  const { id, name, link } = req.body;
  if (id) {
    try {
      const platform = platforms[name-1];
      const socialMedia = await SocialMedia.update(
        { name: platform, link, value: name },
        {
          where: { id },
        }
      );
      if (socialMedia === 0) {
        throw new Error("Links not found or not updated");
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

module.exports = { createSocialMedia, getSocialMedia, editSocialMedia };
