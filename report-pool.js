const ReportTransaction = require('./report-transaction');

class ReportTransactionPool {
  constructor() {
    this.transactions = [];
  }

  updateOrAddTransaction(transaction) {
    // match incoming transaction with transaction in the pool
    let transactionWithId = this.transactions.find(t => t.id === transaction.id);

    if (transactionWithId) {
      // update
      this.transactions[this.transactions.indexOf(transactionWithId)] = this.transaction;
    } else {
      // add
      this.transactions.push(transaction);
    }
  }

  existingTransaction(address) {
    return this.transactions.find(t => t.input.address === address);
  }

  validTransactions() {
    // verify signature
    return this.transactions.filter(transaction => {
      if (!ReportTransaction.verifyTransaction(transaction)) {
        console.log(`Invalid signature from ${transaction.input.address}`);
        return;
      }

      return transaction;
    });
  }

  clear() {
    this.transactions = [];
  }
}

module.exports = ReportTransactionPool;