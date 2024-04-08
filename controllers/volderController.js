const HeroSection = require("../models/HeroSection.js");

async function getheroSection(req, res) {
  try {
    const heroSectionList = await HeroSection.findAll({
      attributes: ["preview"], // Select only the 'preview' attribute
    });
    return res.status(200).json({ heroSectionList });
  } catch (error) {
    console.error("Error during category list retrieval:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during category list retrieval" });
  }
}

module.exports = { getheroSection };
