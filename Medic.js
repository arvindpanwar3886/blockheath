const BlockchainUtil = require('./utils');
const ReportTransaction = require('./report-transaction');

class Medic {
  constructor() {
    this.reports = [{
      data: 'Something Something'
    }];
    this.rewards = 0;
    this.keyPair = BlockchainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  getMedic() {
    return `Medic:
      Reports: ${this.reports}
      Rewards: ${this.rewards}
      Public Key: ${this.publicKey}
    `;
  }

  // sign report transaction
  sign(data) {
    return this.keyPair.sign(data);
  }

  createTransaction(patient, report, transactionPool) {

    if (!report) {
      console.log('Report is not valid! [Medic]');
      return;
    }

    let transaction = transactionPool.existingTransaction(this.publicKey);

    if (transaction) {
      // update
      transaction.update(this, patient, report);
    } else {
      transaction = ReportTransaction.newTransaction(this, patient, report);

      transactionPool.updateOrAddTransaction(transaction);
    }

    return transaction;
  }

  getMedicReports(blockchain) {
    let transactions = [];
    blockchain.chain.forEach(block => {
      block.data.forEach(transaction => {
        transactions.push(transaction);
      });
    });

    const medicInputTs = transactions.filter(transaction => transaction.input.address === this.publicKey);

    return medicInputTs;
  }

}

module.exports = Medic;