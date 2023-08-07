const asyncHandler = require("express-async-handler");
const categoryModel = require("../models/category.model.js");
const {
  createCategoryValidationRules,
  updateCategoryValidationRules,
} = require("../middlewares/category.validator.js");

//get all categories
const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const category = await categoryModel.find();
    res.status(200).json({ message: "Categories found", data: category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "No category found" });
  }
});

//get category by id
const getCategory = asyncHandler(async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    res.status(200).json({ message: "Category found", data: category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "No category found" });
  }
});

// Create category function
const addCategory = async (req, res) => {
  try {
    const { name, lang, metaTitle, metaKeywords, metaDescription, status } =
      req.body;
    const arrKeywords = metaKeywords?.split(",") || [];

    // Create category data object
    const categoryData = {
      name,
      lang,
      metaTitle,
      metaKeywords: arrKeywords,
      metaDescription,
      status,
      createdBy: req.user.id,
    };

    // Save the category data
    const category = await categoryModel.create(categoryData);

    // Send success response
    res
      .status(201)
      .json({ message: "Category created successfully", data: category });
  } catch (error) {
    if (error.message.startsWith("E11000")) {
      res
        .status(500)
        .json({ message: "This Category Name is already registered" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Update category function
const editCategory = async (req, res) => {
  try {
    const { name, lang, metaTitle, metaKeywords, metaDescription, status } =
      req.body;

    // Find the category by ID
    const category = await categoryModel.findById(req.params.id);

    //generate arry from the input
    const arrKeywords = metaKeywords?.split(",") || [];

    // Update the category data
    category.name = name;
    category.lang = lang;
    category.metaTitle = metaTitle;
    category.metaKeywords = arrKeywords;
    category.metaDescription = metaDescription;
    category.status = status;
    category.updatedBy = req.user.id;

    // Save the updated category data
    const updatedCategory = await category.save();

    // Send success response
    res.status(200).json({
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    if (error.message.startsWith("E11000")) {
      res
        .status(500)
        .json({ message: "This Category Name is already registered" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// delete category
const deleteCategory = asyncHandler(async (req, res, next) => {
  try {
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }

    const categoryId = req.params.id;

    const category = await categoryModel.findOneAndUpdate(
      { _id: categoryId },
      {
        status: 2,
      },
      {
        returnOriginal: false,
      }
    );
    res.send(`Deleted the category with ID ${categoryId}`);
  } catch (err) {
    next(err);
  }
});

module.exports = {
  getAllCategories,
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
};
