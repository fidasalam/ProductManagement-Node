const productService = require("../services/productService");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res) => {
  const data = await productService.getAllProducts();
  res.json({ message: "Products retrieved successfully", data });
});

exports.getProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await productService.getProductById(id);
  if (!data) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json({ message: "Product retrieved successfully", data });
});

exports.addProduct = catchAsync(async (req, res) => {
  const productDetails = req.body;
  const data = await productService.addProduct(productDetails);
  res.status(201).json({ message: "Product added successfully", data });
});

exports.updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const productDetails = req.body;
  const data = await productService.updateProduct(id, productDetails);
  if (!data) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json({ message: "Product updated successfully", data });
});

exports.deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const existingProduct = await productService.getProductById(id);
  if (!existingProduct) {
    return res.status(404).json({ error: "Product not found" });
  }
  const data = await productService.deleteProduct(id);
  if (!data) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.status(204).json({ message: "Product deleted successfully" });
});


exports.getProductTotal = catchAsync(async (req, res) => {
  const data = await productService.getTotalPrice();
  console.log("data",data)

  res.json({ message: "Product Total calculated successfully", data });
});