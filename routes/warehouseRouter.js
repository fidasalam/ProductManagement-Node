const express = require("express");
const warehouseController = require("../controllers/warehouseController");

const router = express.Router();

router.get("/", warehouseController.getAllWarehouses);
router.post("/", warehouseController.createWarehouse);

router.get("/:id", warehouseController.getWarehouseById);
router.put("/:id", warehouseController.updateWarehouse);
router.delete("/:id", warehouseController.deleteWarehouse);

module.exports = router;
