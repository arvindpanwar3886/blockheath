import Block from "./Block";

export default class Blockchain {
  chain: [Block];
  constructor() {
    // create a chain and start with genesis block
    this.chain = [Block.createGenesis()];
  }

  addBlock(blockdata: string) {
    this.chain.push(
      Block.mineBlock(this.chain[this.chain.length - 1], blockdata)
    );
  }
}
