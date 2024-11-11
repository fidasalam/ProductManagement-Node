const ledgerService = require("../services/ledgerService");
const catchAsync = require("../utils/catchAsync");

const createLedgerEntry = catchAsync(async (req, res) => {
  const {
    transactionDate,
    description,
    amount,
    transactionType,
    invoiceId,
    productId,
  } = req.body;
  const ledgerEntry = await ledgerService.createLedgerEntry({
    transactionDate,
    description,
    amount,
    transactionType,
    invoiceId,
    productId,
  });
  return res.status(201).json({
    status: "success",
    message: "Ledger entry created successfully.",
    data: ledgerEntry,
  });
});
const getAllLedgerEntries = catchAsync(async (req, res) => {
  const ledgerEntries = await ledgerService.getAllLedgerEntries();
  return res.status(200).json({
    status: "success",
    data: ledgerEntries,
  });
});

const getLedgerEntryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const ledgerEntry = await ledgerService.getLedgerEntryById(Number(id));
  return res.status(200).json({
    status: "success",
    data: ledgerEntry,
  });
});


module.exports = {
  createLedgerEntry,
  getAllLedgerEntries,
  getLedgerEntryById,
};
