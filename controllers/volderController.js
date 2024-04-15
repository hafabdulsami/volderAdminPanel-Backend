const HeroSection = require("../models/HeroSection.js");
const Quality = require("../models/Quality");
const Qualityimage = require("../models/Qualityimage");
const Category = require("../models/Category");
const Categoryimage = require("../models/Categoryimage");
const Productimage = require("../models/Productimage");
const Product = require("../models/Product");

async function getheroSection(req, res) {
  const loadingData = {
    heroSectionList: [],
    qualitiesList: [],
    categoryList: [],
    productList: [],
  };
  try {
    loadingData.heroSectionList = await HeroSection.findAll({
      attributes: ["preview"], // Select only the 'preview' attribute
    });
    loadingData.qualitiesList = await Quality.findAll({
      include: [
        {
          model: Qualityimage,
          attributes: ["preview"],
        },
      ],
    });
    loadingData.categoryList = await Category.findAll({
      include: [
        {
          model: Categoryimage,
          attributes: ["preview"],
        },
      ],
    });
    loadingData.productList = await Product.findAll({
      include: [
        {
          model: Productimage,
          attributes: ["preview"],
        },
      ],
    });
    return res.status(200).json({ loadingData });
  } catch (error) {
    console.error("Error during category list retrieval:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during category list retrieval" });
  }
}

module.exports = { getheroSection };
