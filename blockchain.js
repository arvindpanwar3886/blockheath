const Block = require("./block");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const lastblock = this.chain[this.chain.length - 1];
    const block = Block.mineBlock(lastblock, data);
    this.chain.push(block);
  }

  // chain validation
}

module.exports = Blockchain;
