const BlockchainUtil = require('./utils');

class Wallet {
  constructor() {
    this.reports = [{
      data: 'Something Something'
    }];
    this.keyPair = BlockchainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  getWallet() {
    return `Wallet:
      Reports: ${this.reports}
      Public Key: ${this.publicKey}
    `;
  }
}

module.exports = Wallet;