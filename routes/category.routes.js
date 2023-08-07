const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/token.validator.js");

const {
  getAllCategories,
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
} = require("../controllers/category.controller");

//category routes
router.get("/", validateToken, getAllCategories);
router.get("/:id", validateToken, getCategory);
router.post("/", validateToken, addCategory);
router.put("/:id", validateToken, editCategory);
router.delete("/:id", validateToken, deleteCategory);

module.exports = router;
