const Block = require("./block");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const lastblock = this.chain[this.chain.length - 1];
    const block = Block.mineBlock(lastblock, data);
    this.chain.push(block);
    return block;
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
      if (
        block.hash !== Block.blockHash(block) ||
        block.lasthash !== lastblock.hash
      ) {
        console.log('Hashes do not match');
        return false;
      }
    }
    return true;
  }

  // replace the chain when we get a single longest chain
  replaceChain(incomingChain) {
    // if incoming chain is not long enough and not valid
    if (this.chain.length >= incomingChain.length) {
      console.log("Incoming chain in not long enough.");
      return;
    } else if (!this.isChainValid(incomingChain)) {
      console.log("Incoming chain in not valid.");
      return;
    }

    console.log("Got a new longer chain.");
    this.chain = incomingChain;
  }
}

module.exports = Blockchain;
