const categoryService = require("../services/categoryService");
const catchAsync = require("../utils/catchAsync");

exports.getAllCategories = catchAsync(async (req, res) => {
  const data = await categoryService.getAllCategories();
  res.json({ message: "Categories retrieved successfully", data });
});

exports.getCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const data = await categoryService.getCategoryById(id);
  if (!data) {
    return res.status(404).json({ error: "Category not found" });
  }
  res.json({ message: "Category retrieved successfully", data });
});

exports.addCategory = catchAsync(async (req, res) => {
  const categoryDetails = req.body;
  const data = await categoryService.addCategory(categoryDetails);
  res.status(201).json({ message: "Category added successfully", data });
});

exports.updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const categoryDetails = req.body;
  const data = await categoryService.updateCategory(id, categoryDetails);
  if (!data) {
    return res.status(404).json({ error: "Category not found" });
  }
  res.json({ message: "Category updated successfully", data });
});

exports.deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const existingCategory = await categoryService.getCategoryById(id);
  if (!existingCategory) {
    return res.status(404).json({ error: "Category not found" });
  }
  await categoryService.deleteCategory(id);
  res.status(204).json({ message: "Category deleted successfully" });
});
