/*
  Timestamp
  Data
  Hash
  Lasthash

*/
const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(timestamp, data, lasthash, hash) {
    this.timestamp = timestamp;
    this.data = data;
    this.lasthash = lasthash;
    this.hash = hash;
  }

  getBlock() {
    return `Block------
      Timestamp: ${this.timestamp}
      Data: ${this.data}
      Lasthash: ${this.lasthash}
      Hash: ${this.hash}
    `;
  }

  static genesis() {
    return new this("GenesisTime", [], "-----", "somehash");
  }

  static mineBlock(lastblock, data) {
    const lasthash = lastblock.hash;
    const timestamp = Date.now();
    const hash = Block.hash(timestamp, lasthash, data);
    return new this(timestamp, data, lasthash, hash);
  }

  // to find hash of individual block if we have all the data
  static hash(timestamp, lasthash, data) {
    return SHA256(`${timestamp}${lasthash}${data}`).toString();
  }

  // when we have the block(wrapper function)
  static blockHash(block) {
    const { timestamp, lasthash, data } = block;
    return Block.hash(timestamp, lasthash, data);
  }
}

module.exports = Block;
