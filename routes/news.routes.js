const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const validateToken = require("../middlewares/token.validator.js");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const urlRoute = req.originalUrl?.split("-") || [];
      const folderName = urlRoute[1].trim() || "default-folder"; // specify the folder name dynamically
      const dir = `./uploads/${folderName}`; // specify the destination folder
      if (!fs.existsSync(dir)) {
        // create the directory if it doesn't exist
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      const fileExtension = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + Date.now() + fileExtension); // specify the file name with extension
    },
  }),
});

const {
  getAllNews,
  getNews,
  addNews,
  editNews,
  deleteNews,
} = require("../controllers/news.controller");

// news routes
router.get("/", validateToken, getAllNews);
router.get("/:id", validateToken, getNews);
router.post("/", validateToken, upload.single("photo"), addNews);
router.put("/:id", validateToken, upload.single("photo"), editNews);
router.delete("/:id", validateToken, deleteNews);

module.exports = router;
