const prisma = require("../config/db");
const ledgerService = require("../services/ledgerService");
const axios = require('axios');

class InvoiceService {
  // async createInvoice(customer, items) {
  //   console.log("items:", items);
  //   const result = await prisma.$transaction(async (prisma) => {
  //     const invoice = await prisma.invoice.create({
  //       data: {
  //         customer,
  //         total: 0,
  //         tax: 0,
  //         discount: 0,
  //         status: "Pending",
  //       },
  //     });

  //     let totalAmount = 0;
  //     let totalTax = 0;
  //     let totalDiscount = 0;

  //     for (const item of items) {
  //       const { productId, quantity, tax, discount } = item;
  //       const product = await prisma.product.findUnique({
  //         where: { id: productId },
  //       });
  //       if (!product) throw new Error("Product not found");
  //       if (product.stock < quantity) throw new Error("Insufficient stock");

  //       const saleItemTotal = product.price * quantity;
  //       const itemTax = tax || 0;
  //       const itemDiscount = discount || 0;
  //       const itemTotal = saleItemTotal + itemTax - itemDiscount;

  //       await prisma.saleItem.create({
  //         data: {
  //           invoiceId: invoice.id,
  //           productId,
  //           quantity,
  //           price: product.price,
  //           totalPrice: itemTotal,
  //         },
  //       });

  //       totalAmount += saleItemTotal;
  //       totalTax += itemTax;
  //       totalDiscount += itemDiscount;

  //       // Reduce stock for the product
  //       await prisma.product.update({
  //         where: { id: productId },
  //         data: {
  //           stock: product.stock - quantity,
  //         },
  //       });
  //     }

  //     // Calculate total amount after applying tax and discount
  //     totalAmount += totalTax - totalDiscount;

  //     console.log("Total Amount:", totalAmount);
  //     console.log("Total Tax:", totalTax);
  //     console.log("Total Discount:", totalDiscount);

  //     // Update the invoice with the calculated totals and change the status
  //     const updatedInvoice = await prisma.invoice.update({
  //       where: { id: invoice.id },
  //       data: {
  //         total: totalAmount,
  //         tax: totalTax,
  //         discount: totalDiscount,
  //         status: totalAmount > 0 ? "Paid" : "Pending",
  //       },
  //     });

  //     return {
  //       status: "success",
  //       message: "Invoice created successfully.",
  //       data: {
  //         id: updatedInvoice.id,
  //         customer: updatedInvoice.customer,
  //         total: updatedInvoice.total,
  //         tax: updatedInvoice.tax,
  //         discount: updatedInvoice.discount,
  //         status: updatedInvoice.status,
  //         createdAt: updatedInvoice.createdAt,
  //       },
  //     };
  //   });

  //   return result;
  // }

  // async createInvoice(customer, items) {
  //   console.log("items:", items);
  //   const result = await prisma.$transaction(async (prisma) => {
  //     const invoice = await prisma.invoice.create({
  //       data: {
  //         customer,
  //         total: 0,
  //         tax: 0,
  //         discount: 0,
  //         status: "Pending",
  //       },
  //     });

  //     let totalAmount = 0;
  //     let totalTax = 0;
  //     let totalDiscount = 0;

  //     for (const item of items) {
  //       const { productId, quantity, tax, discount } = item;
  //       const product = await prisma.product.findUnique({
  //         where: { id: productId },
  //       });
  //       if (!product) throw new Error("Product not found");
  //       if (product.stock < quantity) throw new Error("Insufficient stock");

  //       const saleItemTotal = product.price * quantity;
  //       const itemTax = tax || 0;
  //       const itemDiscount = discount || 0;
  //       const itemTotal = saleItemTotal + itemTax - itemDiscount;

  //       await prisma.saleItem.create({
  //         data: {
  //           invoiceId: invoice.id,
  //           productId,
  //           quantity,
  //           price: product.price,
  //           totalPrice: itemTotal,
  //         },
  //       });

  //       totalAmount += saleItemTotal;
  //       totalTax += itemTax;
  //       totalDiscount += itemDiscount;

  //       // Reduce stock for the product
  //       await prisma.product.update({
  //         where: { id: productId },
  //         data: {
  //           stock: product.stock - quantity,
  //         },
  //       });
  //     }

  //     totalAmount += totalTax - totalDiscount;


  //     const updatedInvoice = await prisma.invoice.update({
  //       where: { id: invoice.id },
  //       data: {
  //         total: totalAmount,
  //         tax: totalTax,
  //         discount: totalDiscount,
  //         status: totalAmount > 0 ? "Paid" : "Pending",
  //       },
  //     });

  //     const ledgerEntry = await prisma.ledger.create({
  //       data: {
  //         transactionDate: new Date(),
  //         description: `Invoice created for ${customer}`,
  //         amount: totalAmount,
  //         transactionType: totalAmount > 0 ? "credit" : "debit",
  //         invoiceId: updatedInvoice.id,
  //         productId: items[0].productId,
  //       },
  //     });

  //     return {
  //       status: "success",
  //       message: "Invoice and ledger entry created successfully.",
  //       data: {
  //         id: updatedInvoice.id,
  //         customer: updatedInvoice.customer,
  //         total: updatedInvoice.total,
  //         tax: updatedInvoice.tax,
  //         discount: updatedInvoice.discount,
  //         status: updatedInvoice.status,
  //         createdAt: updatedInvoice.createdAt,
  //         ledgerEntry,
  //       },
  //     };
  //   });

  //   return result;
  // }

//  async createInvoice(mobile, items) {
//     console.log("items:", items);
  
//     try {
//       const userResponse = await axios.get(`http://localhost:3003/api/users/?mobile=${mobile}`);

//       console.log("user",userResponse.data)
//       const customer=userResponse.data.data.name
//       if (!userResponse.data || !userResponse.data.success) {
//         throw new Error("User with this mobile number not found or verification failed");
//       }
//     } catch (error) {
//       throw new Error("User verification failed: " + error.message);
//     }
  
//     const result = await prisma.$transaction(async (prisma) => {
      
//       const invoice = await prisma.invoice.create({
//         data: {
//           mobile,  
//           customer,
//           total: 0,
//           tax: 0,
//           discount: 0,
//           status: "Pending",
//         },
//       });
  
//       let totalAmount = 0;
//       let totalTax = 0;
//       let totalDiscount = 0;
  
//       for (const item of items) {
//         const { productId, quantity, tax, discount } = item;
//         const product = await prisma.product.findUnique({
//           where: { id: productId },
//         });
//         if (!product) throw new Error("Product not found");
//         if (product.stock < quantity) throw new Error("Insufficient stock");
  
//         const saleItemTotal = product.price * quantity;
//         const itemTax = tax || 0;
//         const itemDiscount = discount || 0;
//         const itemTotal = saleItemTotal + itemTax - itemDiscount;
  
//         await prisma.saleItem.create({
//           data: {
//             invoiceId: invoice.id,
//             productId,
//             quantity,
//             price: product.price,
//             totalPrice: itemTotal,
//           },
//         });
  
//         totalAmount += saleItemTotal;
//         totalTax += itemTax;
//         totalDiscount += itemDiscount;
  
//         // Reduce stock for the product
//         await prisma.product.update({
//           where: { id: productId },
//           data: {
//             stock: product.stock - quantity,
//           },
//         });
//       }
  
//       totalAmount += totalTax - totalDiscount;
  
//       const updatedInvoice = await prisma.invoice.update({
//         where: { id: invoice.id },
//         data: {
//           total: totalAmount,
//           tax: totalTax,
//           discount: totalDiscount,
//           status: totalAmount > 0 ? "Paid" : "Pending",
//         },
//       });
  
//       const ledgerEntry = await prisma.ledger.create({
//         data: {
//           transactionDate: new Date(),
//           description: `Invoice created for ${customer}`,
//           amount: totalAmount,
//           transactionType: totalAmount > 0 ? "credit" : "debit",
//           invoiceId: updatedInvoice.id,
//           productId: items[0].productId,
//         },
//       });
  
//       return {
//         status: "success",
//         message: "Invoice and ledger entry created successfully.",
//         data: {
//           id: updatedInvoice.id,
//           customer: updatedInvoice.customer,
//           total: updatedInvoice.total,
//           tax: updatedInvoice.tax,
//           discount: updatedInvoice.discount,
//           status: updatedInvoice.status,
//           createdAt: updatedInvoice.createdAt,
//           ledgerEntry,
//         },
//       };
//     });
  
//     return result;
//   }

async createInvoice(mobile, items) {
  console.log("items:", items);
  
  let customer; // Declare customer variable

  try {
    // Fetch user details using the mobile number
    const userResponse = await axios.get(`http://localhost:3003/api/users/?mobile=${mobile}`);

    // Check if the user response is valid and extract the customer's name
    if (!userResponse.data || !userResponse.data.success) {
      throw new Error("User with this mobile number not found or verification failed");
    }

    // Assign customer name from the API response
    customer = userResponse.data.data.name;
    console.log("User:", userResponse.data);
    
  } catch (error) {
    throw new Error("User verification failed: " + error.message);
  }

  const result = await prisma.$transaction(async (prisma) => {
    
    // Create an invoice with the retrieved customer name
    const invoice = await prisma.invoice.create({
      data: {
        mobile,  
        customer, // Use the customer name retrieved from the API
        total: 0,
        tax: 0,
        discount: 0,
        status: "Pending",
      },
    });

    let totalAmount = 0;
    let totalTax = 0;
    let totalDiscount = 0;

    // Iterate over each item and calculate totals
    for (const item of items) {
      const { productId, quantity, tax, discount } = item;
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) throw new Error("Product not found");
      if (product.stock < quantity) throw new Error("Insufficient stock");

      const saleItemTotal = product.price * quantity;
      const itemTax = tax || 0;
      const itemDiscount = discount || 0;
      const itemTotal = saleItemTotal + itemTax - itemDiscount;

      await prisma.saleItem.create({
        data: {
          invoiceId: invoice.id,
          productId,
          quantity,
          price: product.price,
          totalPrice: itemTotal,
        },
      });

      totalAmount += saleItemTotal;
      totalTax += itemTax;
      totalDiscount += itemDiscount;

      // Reduce stock for the product
      await prisma.product.update({
        where: { id: productId },
        data: {
          stock: product.stock - quantity,
        },
      });
    }

    totalAmount += totalTax - totalDiscount;

    const updatedInvoice = await prisma.invoice.update({
      where: { id: invoice.id },
      data: {
        total: totalAmount,
        tax: totalTax,
        discount: totalDiscount,
        status: totalAmount > 0 ? "Paid" : "Pending",
      },
    });

    const ledgerEntry = await prisma.ledger.create({
      data: {
        transactionDate: new Date(),
        description: `Invoice created for ${customer}`,
        amount: totalAmount,
        transactionType: totalAmount > 0 ? "credit" : "debit",
        invoiceId: updatedInvoice.id,
        productId: items[0].productId,
      },
    });

    return {
      status: "success",
      message: "Invoice and ledger entry created successfully.",
      data: {
        id: updatedInvoice.id,
        customer: updatedInvoice.customer,
        total: updatedInvoice.total,
        tax: updatedInvoice.tax,
        discount: updatedInvoice.discount,
        status: updatedInvoice.status,
        createdAt: updatedInvoice.createdAt,
        ledgerEntry,
      },
    };
  });

  return result;
}


  async getInvoiceById(id) {
    return await prisma.invoice.findUnique({
      where: { id: parseInt(id) },
      include: { items: true },
    });
  }

  async getAllInvoices() {
    return await prisma.invoice.findMany({
      include: { items: true },
    });
  }
}

module.exports = new InvoiceService();
