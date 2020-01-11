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
  /*
    check if new block added to the chain is actually valid or not.

    1. Longer Chain
        - if two miners add chain of same length, since these chains have max length they will be added to the blockchain and half of the miners have chain from first and other half have chain from second therefore the chains will be extended further and whenever a single longest chain is added that chain will be added to every miner making every miner have the same chain. makes sense? no? google forking smh.
          The blocks in the chain that was not added can be added afterwards.
  */
  isChainValid(chain) {
    // starts with genesis?
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
      return false;

    // check if all the blocks are same.
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i]; // current block
      const lastblock = chain[i - 1];
      // check if hashes match?
      if (block.lasthash !== lastblock.hash) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Blockchain;
