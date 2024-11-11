const prisma = require("../config/db");

class CategoryService {
  async getAllCategories() {
    return await prisma.category.findMany();
    
  }

  async getCategoryById(id) {
    return await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: { products: true },
    });
  }

  async addCategory(data) {
    return await prisma.category.create({
      data,
    });
  }

  async updateCategory(id, data) {
    return await prisma.category.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  async deleteCategory(id) {
    return await prisma.category.delete({
      where: { id: parseInt(id) },
    });
  }
}
module.exports = new CategoryService();
