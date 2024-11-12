const rulesService = require('../services/rulesService');

// Discount Controller
async function createDiscount(req, res) {
  try {
    const newDiscount = await rulesService.createDiscount(req.body);
    res.status(201).json(newDiscount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getAllDiscounts(req, res) {
  try {
    const discounts = await rulesService.getAllDiscounts();
    res.status(200).json(discounts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Price Rule Controller
async function createPriceRule(req, res) {
  try {
    const newPriceRule = await rulesService.createPriceRule(req.body);
    res.status(201).json(newPriceRule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getAllPriceRules(req, res) {
  try {
    const priceRules = await rulesService.getAllPriceRules();
    res.status(200).json(priceRules);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Purchase Rule Controller
async function createPurchaseRule(req, res) {
  try {
    const newPurchaseRule = await rulesService.createPurchaseRule(req.body);
    res.status(201).json(newPurchaseRule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getAllPurchaseRules(req, res) {
  try {
    const purchaseRules = await rulesService.getAllPurchaseRules();
    res.status(200).json(purchaseRules);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createDiscount,
  getAllDiscounts,
  createPriceRule,
  getAllPriceRules,
  createPurchaseRule,
  getAllPurchaseRules,
};
