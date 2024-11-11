const express = require("express");
const inventoryController = require("../controllers/inventoryController");
const router = express.Router();

router.post("/", inventoryController.addInventory);
router.put("/:id", inventoryController.updateInventory);
router.get("/:id", inventoryController.getInventoryById);
router.get("/product/:productId/stock", inventoryController.getProductStock);

module.exports = router;
