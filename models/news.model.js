const mongoose = require("mongoose");

const newsSchema = mongoose.Schema(
  {
    headline: {
      type: String,
      required: [true, "Headline is required"],
    },
    subHeadline: {
      type: String,
      required: [true, "Sub-Headline is required"],
    },
    slug: {
      type: String,
      required: [false],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    publishDate: {
      type: String,
      required: [true, "Publish Date is required"],
    },
    categories: {
      type: [String],
      required: [true, "Category is required"],
    },
    isPublished: {
      type: Number,
      required: [true, "Publish Status is required"],
    },
    source: {
      type: String,
      required: [true, "Source is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    isFeatured: {
      type: Number,
      required: [true, "Featured Status is required"],
    },
    featuredPhoto: {
      type: String,
      required: [true, "Featured Photo is required"],
    },
    metaTitle: {
      type: String,
      required: [false],
    },
    metaKeywords: {
      type: [String],
      required: [false],
    },
    metaDescription: {
      type: String,
      required: [false],
    },
    status: {
      type: Number,
      required: [true, "Active Status is required"],
    },
    language: {
      type: String,
      required: [true, "Language is required"],
    },
    createdBy: {
      type: String,
      required: [true, "Created by is required"],
    },
    updatedBy: {
      type: String,
      required: [false],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("news", newsSchema);
