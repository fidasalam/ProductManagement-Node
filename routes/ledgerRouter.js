

const express = require('express');
const ledgerController = require('../controllers/ledgerController');

const router = express.Router();
router.post('/', ledgerController.createLedgerEntry);
router.get('/', ledgerController.getAllLedgerEntries);
router.get('/:id', ledgerController.getLedgerEntryById);

module.exports = router;
