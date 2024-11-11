// controllers/invoiceController.js
const invoiceService = require("../services/invoiceService");
const catchAsync = require("../utils/catchAsync");

class InvoiceController {
  createInvoice = catchAsync(async (req, res) => {
    const {mobile,  items } = req.body;
    const invoice = await invoiceService.createInvoice(mobile,items);
    res.status(201).json({
      status: "success",
      message: "Invoice created successfully.",
      data: invoice,
    });
  });

  getAllInvoices = catchAsync(async (req, res) => {
    const invoices = await invoiceService.getAllInvoices();
    res.status(200).json({
      status: "success",
      message: "Invoice retrieved successfully.",
      data: invoices,
    });
  });

  getInvoiceById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const invoice = await invoiceService.getInvoiceById(id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Invoice retrieved successfully.",
      data: invoice,
    });
  });

  // updateInvoice = catchAsync(async (req, res) => {
  //   const { id } = req.params;
  //   const invoiceData = req.body;
  //   const invoice = await invoiceService.updateInvoice(id, invoiceData);
  //   res.status(200).json({
  //     status: "success",
  //     message: "Invoice updated successfully.",
  //     data: invoice,
  //   });
  // });

  // deleteInvoice = catchAsync(async (req, res) => {
  //   const { id } = req.params;
  //   await invoiceService.deleteInvoice(id);
  //   res
  //     .status(204)
  //     .json({ status: "success", message: "Invoice deleted successfully" });
  // });
}

module.exports = new InvoiceController();
