const catchAsync = require("../utils/catchAsync");
const inventoryService = require("../services/inventoryService");

exports.addInventory = catchAsync(async (req, res) => {
  const inventoryDetails = req.body;

  const newInventory = await inventoryService.addInventory(inventoryDetails);

  return res.status(201).json({
    status: "success",
    message: "Inventory added successfully.",
    data: newInventory,
  });
});

exports.updateInventory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const updatedInventory = await inventoryService.updateInventory(id, quantity);

  return res.status(200).json({
    status: "success",
    message: "Inventory updated successfully.",
    data: updatedInventory,
  });
});

exports.getInventoryById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const inventory = await inventoryService.getInventoryById(id);

  if (!inventory) {
    return res.status(404).json({
      status: "fail",
      message: "Inventory record not found.",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Inventory retrieved successfully.",
    data: inventory,
  });
});

exports.getProductStock = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const stock = await inventoryService.getProductStock(productId);

  return res.status(200).json({
    status: "success",
    message: "Stock retrieved successfully.",
    data: stock,
  });
});
