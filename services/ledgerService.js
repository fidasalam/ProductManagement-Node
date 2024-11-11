const prisma = require("../config/db");

class LedgerService {
  
  async createLedgerEntry({ transactionDate, description, amount, transactionType, invoiceId, productId }) {
    const ledgerEntry = await prisma.ledger.create({
        data: {
            transactionDate: new Date(transactionDate),
            description: description, 
            amount: amount,           
            transactionType: transactionType, 
            invoiceId: invoiceId,  
            productId: productId,    
          },
    });
    return ledgerEntry;
  }


  async getAllLedgerEntries() {
    const ledgerEntries = await prisma.ledger.findMany({
      orderBy: {
        transactionDate: 'desc',
      },
      include: {
        invoice: true,  
        product: true,   
      },
    });
    return ledgerEntries;
  }

  
  async getLedgerEntryById(id) {
    const ledgerEntry = await prisma.ledger.findUnique({
      where: { id },
    });
    if (!ledgerEntry) throw new Error('Ledger entry not found');
    return ledgerEntry;
  }
}

module.exports = new LedgerService();
