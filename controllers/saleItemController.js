const saleItemService = require("../services/saleItemService");
const catchAsync = require("../utils/catchAsync");

class SaleItemController {
  createSaleItem = catchAsync(async (req, res) => {
    const { invoiceId, productId, quantity } = req.body;
    const saleItem = await saleItemService.createSaleItem(
      invoiceId,
      productId,
      quantity
    );
    res.status(201).json({
      status: "success",
      message: "Sale Item created successfully.",
      data: saleItem,
    });
  });

  // getAllSaleItems = catchAsync(async (req, res) => {
  //   const saleItems = await saleItemService.getAllSaleItems();
  //   res.status(200).json({
  //     status: "success",
  //     message: "Sale Item retrieved successfully.",
  //     data: saleItems,
  //   });
  // });

  getSaleItemById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const saleItem = await saleItemService.getSaleItemById(id);
    if (!saleItem) {
      return res.status(404).json({ message: "Sale item not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Sale Item retrieved successfully.",
      data: saleItem,
    });
  });

    updateSaleItem = catchAsync(async (req, res) => {
      const { id } = req.params;
      const quantity = req.body;
      const saleItem = await saleItemService.updateSaleItem(id,quantity);
      res.status(200).json({
        status: "success",
        message: "Sale Item updated successfully.",
        data: saleItem,
      });
    });

    deleteSaleItem = catchAsync(async (req, res) => {
      const { id } = req.params;
      await saleItemService.deleteSaleItem(id);
      res
        .status(204)
        .json({ status: "success", message: "Sale item deleted successfully" });
    });
}

module.exports = new SaleItemController();
