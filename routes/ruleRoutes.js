const express = require('express');
const router = express.Router();
const rulesController = require('../controllers/rulesControllers');

// Discount Routes
router.post('/discounts', rulesController.createDiscount);
router.get('/discounts', rulesController.getAllDiscounts);

// Price Rule Routes
router.post('/price-rules', rulesController.createPriceRule);
router.get('/price-rules', rulesController.getAllPriceRules);

// Purchase Rule Routes
router.post('/purchase-rules', rulesController.createPurchaseRule);
router.get('/purchase-rules', rulesController.getAllPurchaseRules);

module.exports = router;
