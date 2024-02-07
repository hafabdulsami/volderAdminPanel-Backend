const dotenv = require("dotenv");
const Productimage = require("../models/Productimage");
const Product = require("../models/Product");
const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database.js");
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
        return await Productimage.create({
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

async function getProduct(req, res) {
  const { id } = req.query;

  if (id) {
    try {
      const product = await Product.findByPk(id, { include: Productimage });
      console.log(product);
      if (product) {
        // Include the category data in the response
        return res.status(200).json({
          product,
        });
      } else {
        return res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.error("Error during category retrieval:", error);
      return res
        .status(500)
        .json({ message: "An error occurred during category retrieval" });
    }
  }

  try {
    const productList = await Product.findAll({ include: Productimage });
    //const formattedCategoryList = categoryList.map(category => ({
    //  id: category.id,
    //  Name: category.name,
    //  // Add other properties as needed
    //  Images: category.Images.map(image => ({
    //    id: image.id,
    //    name: image.name,
    //    path: image.path,
    //    preview: image.preview,
    //    size: image.size,
    //    type: image.type,
    //  })),
    //}));

    return res.status(200).json({ productList: productList });
  } catch (error) {
    console.error("Error during category list retrieval:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during category list retrieval" });
  }
}

async function editProduct(req, res) {
  const { id, images } = req.body;

  if (!id) {
    return res.status(400).json({ message: "id is empty" });
  }

  if (!images || !Array.isArray(images)) {
    return res
      .status(400)
      .json({ message: "images array is missing or invalid" });
  }

  try {
    await sequelize.transaction(async (t) => {
      // Update Product
      const [updatedRows] = await Product.update(req.body, {
        where: { id },
        transaction: t,
      });

      // Check if the Product was updated successfully
      if (updatedRows === 0) {
        throw new Error("Product not found or not updated");
      }

      // Delete existing Productimage records
      await Productimage.destroy({ where: { productId: id }, transaction: t });

      // Create new Productimage records
      const productImages = images.map((image) => ({
        productId: id,
        ...image,
      }));

      await Productimage.bulkCreate(productImages, { transaction: t });
    });

    return res
      .status(200)
      .json({ message: "Product and images updated successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { createProduct, getProduct, editProduct };
