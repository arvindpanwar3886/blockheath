const BlockchainUtil = require('./utils');

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
}

module.exports = Medic;