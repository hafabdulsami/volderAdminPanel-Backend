const Category = require("../models/Category");
const dotenv = require("dotenv");
const Images = require("../models/Images");
const Product = require("../models/Product");
const { Sequelize } = require("sequelize");
dotenv.config();

async function createProduct(req, res) {
  try {
    const { name, description, featured, specification, categoryId, images } =
      req.body;

    const existingProduct = await Product.findOne({
      where: {
        name: {
          [Sequelize.Op.eq]: name,
        },
      },
    });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with this name already exists" });
    }
    // Step 1: Create a new product
    const newProduct = await Product.create({
      name,
      description,
      featured,
      specification,
      categoryId,
    });

    // Step 2: Associate the product with images
    const imageRecords = await Promise.all(
      images.map(async (image) => {
        // Step 3: Create a new image record and associate it with the product
        return await Images.create({
          ...image,
          productId: newProduct.id,
        });
      })
    );

    // Check if the product and images were created successfully
    if (newProduct && imageRecords) {
      res
        .status(201)
        .json({ message: "Product and images created successfully" });
    } else {
      res.status(500).json({ message: "Product creation failed" });
    }
  } catch (error) {
    console.error("Error during product creation:", error);
    res
      .status(500)
      .json({ message: "An error occurred during product creation" });
  }
}

module.exports = { createProduct };
