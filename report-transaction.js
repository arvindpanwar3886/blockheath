const BlockchainUtil = require('./utils');

class ReportTransaction {
  constructor() {
    this.id = BlockchainUtil.id();
    this.input = null;
    this.outputs = [];
  }

  static newTransaction(senderWallet, recipient, report) {
    const transaction = new this();

    if (!report) {
      return;
    }

    transaction.outputs.push(...[
      {
        report: report,
        address: senderWallet.publicKey,
        sender: 'Senders info'
      },
      {
        report: report,
        address: recipient
      }
    ]);

    return transaction;
  }
}

module.exports = ReportTransaction;
