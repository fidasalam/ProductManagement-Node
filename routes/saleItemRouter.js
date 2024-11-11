// routes/saleItemRouter.js
const express = require('express');
const saleItemController = require('../controllers/saleItemController');
const router = express.Router();

router.post('/', saleItemController.createSaleItem);
// router.get('/', saleItemController.getAllSaleItems);
router.get('/:id', saleItemController.getSaleItemById);
// router.put('/:id', saleItemController.updateSaleItem);
// router.delete('/:id', saleItemController.deleteSaleItem);

module.exports = router;
