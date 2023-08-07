const validator = require("validator");
const categoryModel = require("../models/category.model");

const uniqueCategoryName = async (value) => {
  try {
    const name = await categoryModel.findOne({ name: value });
    if (name) {
      throw new Error("Category Name already exists");
    }
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createCategoryValidationRules = async (req, res, next) => {
  try {
    const { name, lang, metaTitle, metaKeywords, metaDescription, status } =
      req.body;

    if (!name || !lang || !metaTitle || !status) {
      throw new Error("Please provide all required fields");
    }

    if (validator.isEmpty(data.name)) {
      throw new Error("Category Name field is required");
    } else if (!validator.isLength(data.name, { min: 5 })) {
      throw new Error("Category Name must be at least 5 characters");
    }

    if (!validator.isInt(data.role)) {
      throw new Error("Invalid role");
    }

    if (!validator.isInt(data.status)) {
      throw new Error("Invalid status");
    }

    await uniqueCategoryName(name);

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCategoryValidationRules = async (req, res, next) => {
  try {
    const { name, lang, metaTitle, metaKeywords, metaDescription, status } =
      req.body;

    if (!name || !lang || !metaTitle || !status) {
      throw new Error("Please provide all required fields");
    }

    if (validator.isEmpty(data.name)) {
      throw new Error("Category Name field is required");
    } else if (!validator.isLength(data.name, { min: 5 })) {
      throw new Error("Category Name must be at least 5 characters");
    }

    if (!validator.isInt(data.role)) {
      throw new Error("Invalid role");
    }

    if (!validator.isInt(data.status)) {
      throw new Error("Invalid status");
    }

    await uniqueCategoryName(name);

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createCategoryValidationRules,
  updateCategoryValidationRules,
};
