const asyncHandler = require("express-async-handler");
const newsModel = require("../models/news.model");
const {
  createNewsValidationRules,
  updateNewsValidationRules,
} = require("../middlewares/news.validator.js");

//get news for admin panel
const getAllNews = asyncHandler(async (req, res) => {
  try {
    const allNews = newsModel.find();
    res.status(200).json({ message: "News found", data: allNews });
  } catch (error) {
    res.status(500).json({ message: "No news found" });
  }
});

//get news by id
const getNews = asyncHandler(async (req, res) => {
  try {
    const news = newsModel.find(req.params.id);
    res.status(200).json({ message: "News found", data: news });
  } catch (error) {
    res.status(500).json({ message: "No news found with this ID" });
  }
});

//insert news
const addNews = asyncHandler(async (req, res) => {
  try {
    const {
      headline,
      subHeadline,
      slug,
      content,
      publishDate,
      categories,
      isPublished,
      source,
      author,
      isFeatured,
      status,
      language,
      metaTitle,
      metaKeywords,
      metaDescription,
    } = req.body;

    // image upload
    const photo = req?.file;

    //generate array from the categories input
    const arrCategories = categories?.split(",") || [];

    //generate array from the metaKeywords input
    const arrKeywords = metaKeywords?.split(",") || [];

    // Create news data object
    const newsData = {
      headline,
      subHeadline,
      slug,
      content,
      publishDate,
      categories: arrCategories,
      isPublished,
      source,
      author,
      isFeatured,
      status,
      language,
      metaTitle,
      metaKeywords: arrKeywords,
      metaDescription,
      featuredPhoto: photo?.filename,
      createdBy: req.user.id,
    };

    // Save the user data
    const news = await newsModel.create(newsData);

    // Send success response
    res.status(201).json({ message: "News created successfully", data: news });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update news
const editNews = asyncHandler(async (req, res) => {
  try {
    const {
      subHeadline,
      headline,
      slug,
      content,
      publishDate,
      categories,
      isPublished,
      source,
      author,
      isFeatured,
      status,
      language,
      metaTitle,
      metaKeywords,
      metaDescription,
    } = req.body;

    // image upload
    const photo = req?.file;

    //generate array from the categories input
    const arrCategories = categories?.split(",") || [];

    //generate array from the metaKeywords input
    const arrKeywords = metaKeywords?.split(",") || [];

    // Find the news by ID
    const news = await newsModel.findById(req.params.id);

    // Update the news data
    news.headline = headline;
    news.subHeadline = subHeadline;
    news.slug = slug;
    news.content = content;
    news.publishDate = publishDate;
    news.categories = arrCategories;
    news.isPublished = isPublished;
    news.source = source;
    news.author = author;
    news.isFeatured = isFeatured;
    news.featuredPhoto = photo?.filename;
    news.metaTitle = metaTitle;
    news.metaKeywords = arrKeywords;
    news.metaDescription = metaDescription;
    news.status = status;
    news.language = language;
    news.updatedBy = req.user.id;

    // Save the updated news data
    const updatedNews = await News.save();

    // Send success response
    res.status(200).json({
      message: "News updated successfully",
      data: updatedNews,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete news
const deleteNews = asyncHandler(async (req, res) => {
  try {
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }

    const newsId = req.params.id;

    const news = await newsModel.findOneAndUpdate(
      { _id: newsId },
      {
        status: 2,
      },
      {
        returnOriginal: false,
      }
    );
    res.send(`Deleted the news with ID ${newsId}`);
  } catch (error) {
    next(error.message);
  }
});

//delete image
const deletePhoto = asyncHandler(async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }

    const user = await newsModel.findOneAndUpdate(
      { _id: id },
      {
        photo: "",
      },
      {
        returnOriginal: false,
      }
    );
    res.send(`Photo deleted successfully`);
  } catch (error) {
    next(error.message);
  }
});

module.exports = {
  getAllNews,
  getNews,
  addNews,
  editNews,
  deleteNews,
  deletePhoto,
};
