const validator = require("validator");

const createNewsValidationRules = async (req, res, next) => {
  try {
    const {
      headline,
      subHeadline,
      publishDate,
      categories,
      isPublished,
      metaTitle,
      metaKeywords,
      metaDescription,
      status,
    } = req.body;

    if (
      !headline ||
      !subHeadline ||
      !publishDate ||
      !categories ||
      !isPublished ||
      !metaTitle ||
      !metaKeywords ||
      !metaDescription ||
      !status
    ) {
      throw new Error("Please provide all required fields");
    }

    if (validator.isEmpty(data.headline)) {
      throw new Error("Headline field is required");
    } else if (!validator.isLength(data.headline, { min: 5 })) {
      throw new Error("Headline must be at least 5 characters");
    }

    if (validator.isEmpty(data.subHeadline)) {
      throw new Error("Category Sub-Headline field is required");
    } else if (!validator.isLength(data.subHeadline, { min: 5 })) {
      throw new Error("Category Sub-Headline must be at least 5 characters");
    }

    if (validator.isEmpty(data.categories)) {
      throw new Error("Categories field is required");
    }

    if (validator.isEmpty(data.publishDate)) {
      throw new Error("Publish Date field is required");
    }

    if (validator.isEmpty(data.isPublished)) {
      throw new Error("Publish Status field is required");
    }

    if (validator.isEmpty(data.metaTitle)) {
      throw new Error("Meta Title field is required");
    } else if (!validator.isLength(data.metaTitle, { min: 5 })) {
      throw new Error("Meta Title must be at least 5 characters");
    }

    if (validator.isEmpty(data.metaKeywords)) {
      throw new Error("Meta Keywords field is required");
    }

    if (validator.isEmpty(data.status)) {
      throw new Error("Status field is required");
    }

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateNewsValidationRules = async (req, res, next) => {
  try {
    const {
      headline,
      subHeadline,
      publishDate,
      categories,
      isPublished,
      metaTitle,
      metaKeywords,
      metaDescription,
      status,
    } = req.body;

    if (
      !headline ||
      !subHeadline ||
      !publishDate ||
      !categories ||
      !isPublished ||
      !metaTitle ||
      !metaKeywords ||
      !metaDescription ||
      !status
    ) {
      throw new Error("Please provide all required fields");
    }

    if (validator.isEmpty(data.headline)) {
      throw new Error("Headline field is required");
    } else if (!validator.isLength(data.headline, { min: 5 })) {
      throw new Error("Headline must be at least 5 characters");
    }

    if (validator.isEmpty(data.subHeadline)) {
      throw new Error("Category Sub-Headline field is required");
    } else if (!validator.isLength(data.subHeadline, { min: 5 })) {
      throw new Error("Category Sub-Headline must be at least 5 characters");
    }

    if (validator.isEmpty(data.categories)) {
      throw new Error("Categories field is required");
    }

    if (validator.isEmpty(data.publishDate)) {
      throw new Error("Publish Date field is required");
    }

    if (validator.isEmpty(data.isPublished)) {
      throw new Error("Publish Status field is required");
    }

    if (validator.isEmpty(data.metaTitle)) {
      throw new Error("Meta Title field is required");
    } else if (!validator.isLength(data.metaTitle, { min: 5 })) {
      throw new Error("Meta Title must be at least 5 characters");
    }

    if (validator.isEmpty(data.metaKeywords)) {
      throw new Error("Meta Keywords field is required");
    }

    if (validator.isEmpty(data.status)) {
      throw new Error("Status field is required");
    }

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createNewsValidationRules,
  updateNewsValidationRules,
};
