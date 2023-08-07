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
  addUser,
  getAllUsers,
  getUser,
  editUser,
  deletePhoto,
  deleteUser,
} = require("../controllers/user.controller");

// user routes
router.get("/", getAllUsers);
router.get("/:id", validateToken, getUser);
router.post("/", upload.single("photo"), addUser);
router.put("/:id", validateToken, upload.single("photo"), editUser);
router.put("/:id/delete-photo", validateToken, deletePhoto);
router.delete("/:id", validateToken, deleteUser);

module.exports = router;
