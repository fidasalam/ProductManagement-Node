const prisma = require("../config/db");

class ProductService {
  async getAllProducts() {
    return await prisma.product.findMany({
      include: {
        categories: true,
        attributes:true,
        discounts: true,
        priceRules: true,
        purchaseRules: true,
      },
      orderBy: { id: "asc" },
    });
  }

  async getProductById(id) {
    return await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        categories: true,
        attributes:true,
        discounts: true,
        priceRules: true,
        purchaseRules: true,
      },
    });
  }

  // async getProductById(id) {
  //   return await prisma.category.findUnique({
  //     where: { id: Number(id) },
  //     select: {
  //       name: true,
  //       products: {
  //         select: {
  //           name: true,
  //         },
  //       },
  //     },
  //   });
  // }

  async addProduct(productDetails) {
    // Check if product with the same SKU already exists
    const existingProduct = await prisma.product.findUnique({
      where: {
        sku: productDetails.sku,
      },
    });
  
    if (existingProduct) {
      throw new Error("A product with this SKU already exists.");
    }
  
    // Create the new product
    return await prisma.product.create({
      data: {
        name: productDetails.name,
        description: productDetails.description,
        price: productDetails.price,
        stock: productDetails.stock,
        sku: productDetails.sku,
        categories: {
          connect: productDetails.categories.map((id) => ({ id })),
        },
        attributes: {
          create: productDetails.attributes.map((attribute) => ({
            name: attribute.name,
            value: attribute.value,
          })),
        },
        discounts: {
          connect : productDetails.discounts.map((id)=>({id}))
        },
        priceRules:{
          connect: productDetails.priceRules.map((id)=>({id}))
        },
        purchaseRules: {
          connect: productDetails.purchaseRules.map((id) => ({ id })),
        },
      },
      include: {
        categories: true,
        attributes: true,
        discounts: true,
        priceRules: true,
        purchaseRules: true,
      },
    });
  }
  

  async updateProduct(id, productDetails) {
    return await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: productDetails.name,
        description: productDetails.description,
        price: productDetails.price,
        stock: productDetails.stock,
        categories: {
          disconnect: productDetails.removeCategories
            ? productDetails.removeCategories.map((categoryId) => ({
                id: categoryId,
              }))
            : [],
          connect: productDetails.categories.map((categoryId) => ({
            id: categoryId,
          })),
        },
      },
      include: {
        categories: true,
      },
    });
  }
  async deleteProduct(id) {
    return await prisma.product.delete({
      where: { id: Number(id) },
    });
  }

  async getTotalPrice() {
    const result = await prisma.product.aggregate({
      _sum: {
        price: true,
      },
    });
    console.log(result, ":totalPrice");
    return result._sum.price;
  }
}

module.exports = new ProductService();
