const BlockchainUtil = require('./utils');

class ReportTransaction {
  constructor() {
    this.id = BlockchainUtil.id();
    this.input = null;
    this.outputs = [];
  }

  static newTransaction(medic, patientKey, report) {
    // local report transaction
    const transaction = new this();

    // Should be a valid report
    if (!report) {
      console.log(`Report does not exist. ${report}`);
      return;
    }

    // on valid report create output of report transaction
    transaction.outputs.push(...[
      // person responsible for adding report
      {
        report,
        address: medic.publicKey
      },
      // patient to which the report belongs
      {
        report,
        address: patientKey
      }
    ]);

    ReportTransaction.signTransaction(transaction, medic);

    return transaction;
  }

  static signTransaction(reportTransaction, medic) {
    reportTransaction.input = {
      timestamp: Date.now(),
      res: "Medic",
      address: medic.publicKey, // addr of sender
      signature: medic.sign(BlockchainUtil.hash(transaction.outputs))
    };
  }

  verifyTransaction(transaction) {
    return BlockchainUtil.verifySignature(
      transaction.input.address,
      transaction.input.signature,
      BlockchainUtil.hash(transaction.outputs));
  }
}

module.exports = ReportTransaction;
