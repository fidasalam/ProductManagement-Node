const prisma = require("../config/db");
// Discount Functions
async function createDiscount(data) {
  return await prisma.discount.create({
    data: {
      name: data.name,
      amount: data.amount,
      type: data.type,
      startDate: data.startDate,
      endDate: data.endDate,
    },
  });
}

async function getAllDiscounts() {
  return await prisma.discount.findMany();
}

// Price Rule Functions
async function createPriceRule(data) {
  return await prisma.priceRule.create({
    data: {
      name: data.name,
      discount: data.discount,
      startDate: data.startDate,
      endDate: data.endDate,
    },
  });
}

async function getAllPriceRules() {
  return await prisma.priceRule.findMany();
}

// Purchase Rule Functions
async function createPurchaseRule(data) {
  return await prisma.purchaseRule.create({
    data: {
      name: data.name,
      quantity: data.quantity,
      discount: data.discount,
    },
  });
}

async function getAllPurchaseRules() {
  return await prisma.purchaseRule.findMany();
}

module.exports = {
  createDiscount,
  getAllDiscounts,
  createPriceRule,
  getAllPriceRules,
  createPurchaseRule,
  getAllPurchaseRules,
};
