// const mongoose = require("mongoose");

// const categorySchema = mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Category Name is required"],
//       unique: [true, "This Category Name is already registered"],
//     },
//     metaTitle: {
//       type: String,
//       required: [false],
//     },
//     metaKeywords: {
//       type: [String],
//       required: [false],
//     },
//     metaDescription: {
//       type: String,
//       required: [false],
//     },
//     status: {
//       type: String,
//       required: [true, "Active Status is required"],
//     },
//     createdBy: {
//       type: String,
//       required: [true, "Created by is required"],
//     },
//     updatedBy: {
//       type: String,
//       required: [false],
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("category", categorySchema);

const sql = require("../config/dbConnection");

// constructor
const Category = function (category) {
  this.name = category.name;
  this.slug = category.slug;
  this.language = category.language;
  this.status = category.status;
  this.metaTitle = category.meta_title;
  this.metaKeyword = category.meta_keyword;
  this.metaDescription = category.meta_description;
};

Category.create = (newCategory, result) => {
  sql.query("INSERT INTO tbl_category SET ?", newCategory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created category: ", { id: res.insertId, ...newCategory });
    result(null, { id: res.insertId, ...newCategory });
  });
};

Category.findById = (id, result) => {
  sql.query(`SELECT * FROM tbl_category WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found category: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Category with the id
    result({ kind: "not_found" }, null);
  });
};

Category.getAll = (name, result) => {
  let query = "SELECT * FROM tbl_category";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tbl_category: ", res);
    result(null, res);
  });
};

Category.getAllPublished = (result) => {
  sql.query("SELECT * FROM tbl_category WHERE status=1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tbl_category: ", res);
    result(null, res);
  });
};

Category.updateById = (id, category, result) => {
  sql.query(
    "UPDATE tbl_category SET name = ?, slug = ?,language = ?, status = ?, metaTitle = ?, metaKeyword = ?, metaDescription = ? WHERE id = ?",
    [
      category.name,
      category.slug,
      category.language,
      category.status,
      category.metaTitle,
      category.metaKeyword,
      category.metaDescription,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Category with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated category: ", { id: id, ...category });
      result(null, { id: id, ...category });
    }
  );
};

Category.remove = (id, result) => {
  sql.query("DELETE FROM tbl_category WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Category with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted category with id: ", id);
    result(null, res);
  });
};

Category.removeAll = (result) => {
  sql.query("DELETE FROM tbl_category", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tbl_category`);
    result(null, res);
  });
};

module.exports = Category;
