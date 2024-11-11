
const prisma = require('../config/db');

class WarehouseService {
  async createWarehouse(warehouseData) {
    return await prisma.warehouse.create({
      data: warehouseData,
    });
  }

  
  async getAllWarehouses() {
    return await prisma.warehouse.findMany();
  }


  async getWarehouseById(id) {
    return await prisma.warehouse.findUnique({
      where: { id: parseInt(id) },
    });
  }

  
  async updateWarehouse(id, warehouseData) {
    return await prisma.warehouse.update({
      where: { id: parseInt(id) },
      data: warehouseData,
    });
  }


  async deleteWarehouse(id) {
    return await prisma.warehouse.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = new WarehouseService();
