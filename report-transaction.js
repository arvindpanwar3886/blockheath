const BlockchainUtil = require('./utils');
const { MINING_REWARD } = require('./config');

class ReportTransaction {
  constructor() {
    this.id = BlockchainUtil.id();
    this.input = null;
    this.outputs = [];
  }

  static newTransaction(medic, patientKey, report) {

    // Should be a valid report
    if (!report) {
      console.log(`Report does not exist. ${report}`);
      return;
    }

    // on valid report create output of report transaction

    return ReportTransaction.transactionWithOutputs(medic, [
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
  }

  // static rewardTransaction(minerMedic, medichainMedic) {
  //   return ReportTransaction.transactionWithOutputs(medichainMedic, [{

  //   }])
  // }

  static signTransaction(reportTransaction, medic) {
    reportTransaction.input = {
      timestamp: Date.now(),
      res: "Medic",
      address: medic.publicKey, // addr of sender
      signature: medic.sign(BlockchainUtil.hash(reportTransaction.outputs))
    };
  }

  static verifyTransaction(transaction) {
    return BlockchainUtil.verifySignature(
      transaction.input.address,
      transaction.input.signature,
      BlockchainUtil.hash(transaction.outputs));
  }

  update(medic, patient, report) {
    const medicOutput = this.outputs.find(output => output.address === medic.publicKey);

    if (!report) {
      console.log('report not valid [medic-update]');
      return;
    }

    medicOutput.report = report;

    this.outputs.push({
      report, address: patient
    });

    ReportTransaction.signTransaction(this, medic);

    return this;
  }

  static transactionWithOutputs(medic, outputs) {
    // local report transaction
    const transaction = new this();

    transaction.outputs.push(...outputs);

    ReportTransaction.signTransaction(transaction, medic);

    return transaction;
  }
}

module.exports = ReportTransaction;
