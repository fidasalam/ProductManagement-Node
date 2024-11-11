

const prisma = require('../config/db');

class InventoryService {
  

  async addInventory(inventoryDetails) {
    const { productId, warehouseId, quantity } = inventoryDetails;
    const productExists = await prisma.product.findUnique({
      where: { id: (productId) },
    });
  
    if (!productExists) {
      throw new Error(`Product with ID ${productId} does not exist.`);
    }
  
    const inventory = await prisma.inventory.create({
      data: {
        productId,
        warehouseId,
        quantity,
      },
    });

  
    await prisma.product.update({
      where: { id: productId },
      data: { stock: { increment: quantity } },
    });

    return inventory;
  }


  async updateInventory(id, newQuantity) {
    const currentInventory = await prisma.inventory.findUnique({
      where: { id: parseInt(id) },
    });

    if (!currentInventory) {
      throw new Error("Inventory record not found.");
    }

    const quantityDifference = newQuantity - currentInventory.quantity;

    const updatedInventory = await prisma.inventory.update({
      where: { id: parseInt(id) },
      data: { quantity: newQuantity },
    });

    
    await prisma.product.update({
      where: { id: currentInventory.productId },
      data: { stock: { increment: quantityDifference } },
    });

    return updatedInventory;
  }

  async getInventoryById(id) {
    return await prisma.inventory.findUnique({
      where: { id: parseInt(id) },
      include: {
        product: true,
        warehouse: true,
      },
    });
  }

  
  async getProductStock(productId) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { stock: true },
    });
    return product ? product.stock : 0;
  }
}

module.exports = new InventoryService();
