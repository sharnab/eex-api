const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// const upload = multer({ dest: "./uploads/users" });

const UserRoutes = require("./user.routes");
const CategoryRoutes = require("./category.routes");
const NewsRoutes = require("./news.routes");

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

const { loginUser } = require("../controllers/user.controller");

const validateToken = require("../middlewares/token.validator.js");

const router = express.Router();

//admin login
router.post("/login", loginUser);

// user routes
router.use("/user", UserRoutes);
// router.get("/all-user", validateToken, getAllUsers);
// router.get("/:id/view-user", validateToken, getUser);
// router.post("/add-user", validateToken, upload.single("photo"), addUser);
// router.put("/:id/edit-user", validateToken, upload.single("photo"), editUser);
// router.put("/:id/delete-photo", validateToken, deletePhoto);
// router.put("/:id/delete-user", validateToken, deleteUser);

//category routes
router.use("/category", CategoryRoutes);
// router.get("/all-category", validateToken, getAllCategories);
// router.get("/:id/view-category", validateToken, getCategory);
// router.post("/add-category", validateToken, addCategory);
// router.put("/:id/edit-category", validateToken, editCategory);
// router.put("/:id/delete-category", validateToken, deleteCategory);

//newsreport routes
router.use("/news", NewsRoutes);
// router.get("/all-news", validateToken, getAllNews);
// router.get("/:id/view-news", validateToken, getNews);
// router.post("/add-news", validateToken, upload.single("photo"), addNews);
// router.put("/:id/edit-news", validateToken, upload.single("photo"), editNews);
// router.put("/:id/delete-news", validateToken, deleteNews);

module.exports = router;
