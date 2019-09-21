import Block from "../block_utils/Block";
import { GENESIS } from "../config";
import sha256 from "crypto-js/sha256";

export default class Blockchain {
  chain: [Block];
  //chainHead: Block;
  constructor() {
    // create a chain and start with genesis block
    this.chain = [
      //genesis block
      new Block(
        GENESIS["GENESIS_TIME"],
        GENESIS["GENESIS_PREV_HASH"],
        sha256(
          GENESIS["GENESIS_TIME"] +
            GENESIS["GENESIS_PREV_HASH"] +
            GENESIS["GENESIS_DATA"]
        ).toString(),
        GENESIS["GENESIS_DATA"]
      )
    ];
  }

  addBlock(blockdata: string) {
    this.chain.push(
      Block.mineBlock(this.chain[this.chain.length - 1], blockdata)
    );
    console.log(this.chain[this.chain.length - 1]);
  }
}
