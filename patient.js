const BlockchainUtil = require('./utils');

class Patient {
  constructor() {
    this.reports = [{
      data: 'Something Something'
    }];
    this.keyPair = BlockchainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  getPatientInfo() {
    return `PatientInfo:
      Reports: ${this.reports}
      Public Key: ${this.publicKey}
    `;
  }
}

module.exports = Patient;