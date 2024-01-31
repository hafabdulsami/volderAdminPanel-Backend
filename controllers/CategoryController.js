const Category = require("../models/Category");
const dotenv = require("dotenv");
const Images = require("../models/Images");
dotenv.config();

// Create a new category
async function createCategory(req, res) {
  console.log(req.body);
  try {
    const { name, images } = req.body;

    const newCategory = await Category.create({ name });

    const imageRecord = await Images.create({
      ...images[0],
      categoryId: newCategory.id,
    });

    if (newCategory && imageRecord) {
      res
        .status(201)
        .json({ message: "Category and images created successfully" });
    } else {
      res.status(500).json({ error: "Category creation failed" });
    }
  } catch (error) {
    // Your existing error handling code
    console.error("Error during category creation:", error);
    res
      .status(500)
      .json({ error: "An error occurred during category creation" });
  }
}

async function editCategory(req, res) {
  const { id, name, images } = req.body;
  //console.log(req.body);
  if (id) {
    try {
      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ error: "Category not found." });
      }
      if (name) {
        category.name = name;
        await category.save();
      }
      const existingImage = await Images.update(
        {
          ...images[0],
          categoryId: id,
        },
        { where: { categoryId: id } }
      );
      //const existingImage = await Images.findOne({ where: { categoryId: id } });
      //Object.assign(existingImage, images);
      //await existingImage.save();
      console.log(existingImage);

      // You can perform updates or any other logic here

      return res
        .status(200)
        .json({ message: "Category and images update successfully." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error." });
    }
  } else {
    return res.status(500).json({ error: "id is empty" });
  }
}

async function getCategory(req, res) {
  const { id } = req.query;

  if (id) {
    try {
      const category = await Category.findByPk(id, { include: Images });
      if (category) {
        // Include the category data in the response
        return res.status(200).json({
          category,
        });
      } else {
        return res.status(404).json({ error: "Category not found" });
      }
    } catch (error) {
      console.error("Error during category retrieval:", error);
      return res
        .status(500)
        .json({ error: "An error occurred during category retrieval" });
    }
  }

  try {
    const categoryList = await Category.findAll({ include: Images });
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

    return res.status(200).json({ categoryList: categoryList });
  } catch (error) {
    console.error("Error during category list retrieval:", error);
    return res
      .status(500)
      .json({ error: "An error occurred during category list retrieval" });
  }
}

module.exports = { createCategory, getCategory, editCategory };
