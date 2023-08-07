const express = require("express");
const { getFeaturedNews } = require("../controllers/public.controller");

const router = express.Router();

// get category list
// router.get("/all-categories", getAllCategories);

//get all featured news articles
// router.get("/featured-news/:categoryID", getFeaturedNews);

// router.get("/categorized-news/:categoryID", getNewsByCategory);

//get specific news article
// router.get("/:categoryID/:id", getNewsByID);

//get e-paper by date
// router.get("/e-paper/:date", getEpaperByDate);

module.exports = router;
