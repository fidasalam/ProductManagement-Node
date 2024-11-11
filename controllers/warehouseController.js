const catchAsync = require("../utils/catchAsync");
const warehouseService = require("../services/warehouseService");

exports.createWarehouse = catchAsync(async (req, res) => {
  const { name, location } = req.body;

  const data = await warehouseService.createWarehouse({ name, location });

  return res.status(201).json({
    message: "Warehouse created successfully",
    status: "success",
    data: data,
  });
});


exports.getAllWarehouses = catchAsync(async (req, res) => {
  const warehouses = await warehouseService.getAllWarehouses();

  return res.status(200).json({
    message: "Warehouse retrieved successfully",
    status: "success",
    data: warehouses,
  });
});


exports.getWarehouseById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const warehouse = await warehouseService.getWarehouseById(id);

  if (!warehouse) {
    return res.status(404).json({
      status: "fail",
      message: "Warehouse not found",
    });
  }

  return res.status(200).json({
    message: "Warehouse retrieved successfully",
    status: "success",
    data: warehouse,
  });
});


exports.updateWarehouse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const updatedWarehouse = await warehouseService.updateWarehouse(id, updates);

  if (!updatedWarehouse) {
    return res.status(404).json({
      status: "fail",
      message: "Warehouse not found",
    });
  }

  return res.status(200).json({
    message: "Warehouse updated successfully",
    status: "success",
    data: updatedWarehouse,
  });
});


exports.deleteWarehouse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const deletedWarehouse = await warehouseService.deleteWarehouse(id);

  if (!deletedWarehouse) {
    return res.status(404).json({
      status: "fail",
      message: "Warehouse not found",
    });
  }

  return res.status(204).json({
    message: "Warehouse deleted successfully",
    status: "success",
    data: deletedWarehouse,
  });
});
