const asyncHandler = require("express-async-handler");
const newsModel = require("../models/news.model");
const categoryModel = require("../models/category.model.js");
// const epaperModel = require("../models/epaper.model.js");

//get all categories to view on top of the navbar
const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const category = await categoryModel.find({ status: 1 });
    res.status(200).json({ message: "Categories found", data: category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "No category found" });
  }
});

const getFeaturedNews = asyncHandler(async (req, res) => {
  try {
    //get current datetime as "2020-06-13T18:30:00.000Z" format
    // const datetime = today.toISOString();
    // seperating date and time
    // const arrDatetime = datetime?.split("T") || [];
    // in order to search news via date
    // const date = arrDatetime[0];
    const news = newsModel
      .find({ isFeatured: 1, categories: req.params.category, status: 1 })
      .sort({ publishDate: "desc" });
    res.status(200).json({ message: "News found", data: news });
  } catch (error) {
    res.status(500).json({ message: "No news found with this ID" });
  }
});

// get news by category selected
const getNewsByCategory = asyncHandler(async (req, res) => {
  try {
    const news = newsModel
      .find({ categories: req.params.category, status: 1 })
      .sort({ publishDate: "desc" });
    res.status(200).json({ message: "News found", data: news });
  } catch (error) {
    res.status(500).json({ message: "No news found with this Category" });
  }
});

// get news by ID & selected Category
const getNewsByID = asyncHandler(async (req, res) => {
  try {
    const news = newsModel.find({
      id: req.params.id,
      categories: req.params.category,
      status: 1,
    });
    res.status(200).json({ message: "News found", data: news });
  } catch (error) {
    res.status(500).json({ message: "No news found with this ID" });
  }
});

// get epaper by date
const getEpaperByDate = asyncHandler(async (req, res) => {
  try {
    //get current datetime as "2020-06-13T18:30:00.000Z" format
    const datetime = today.toISOString();
    // seperating date and time
    const arrDatetime = datetime?.split("T") || [];
    // in order to search epaper via date
    const date = arrDatetime[0];
    const epaperData = ""; //epaperModel.find({ publishDate: date, status: 1 });
    res.status(200).json({ message: "News found", data: epaperData });
  } catch (error) {
    res.status(500).json({ message: "No news found with this ID" });
  }
});

module.exports = {
  getAllCategories,
  getNewsByCategory,
  getFeaturedNews,
  getNewsByID,
  getEpaperByDate,
};
