const prisma = require("../config/db");

class SaleItemService {
  async getSaleItemsByInvoiceId(invoiceId) {
    return await prisma.saleItem.findMany({
      where: { invoiceId },
      include: { product: true },
    });
  }

  async createSaleItem(invoiceId, productId, quantity) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) throw new Error("Product not found");

    const saleItemTotal = product.price * quantity;

    return await prisma.saleItem.create({
      data: {
        invoiceId,
        productId,
        quantity,
        price: product.price,
        totalPrice: saleItemTotal,
      },
    });
  }
  async updateSaleItem(id, quantity) {
    const saleItem = await prisma.saleItem.findUnique({ where: { id } });
    if (!saleItem) throw new Error("SaleItem not found");

    const product = await prisma.product.findUnique({
      where: { id: saleItem.productId },
    });
    const totalPrice = product.price * quantity;

    return await prisma.saleItem.update({
      where: { id },
      data: { quantity, totalPrice },
    });
  }

  async deleteSaleItem(id) {
    return await prisma.saleItem.delete({ where: { id } });
  }
}

module.exports = new SaleItemService();
