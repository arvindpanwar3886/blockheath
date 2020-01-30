/*
  Timestamp
  Data
  Hash
  Lasthash

*/
const SHA256 = require("crypto-js/sha256");
const DIFFICULTY = 3;

class Block {
  constructor(timestamp, data, lasthash, hash, nonce) {
    this.timestamp = timestamp;
    this.data = data;
    this.lasthash = lasthash;
    this.hash = hash;
    this.nonce = nonce;
  }

  getBlock() {
    return `Block------
      Timestamp: ${this.timestamp}
      Data: ${this.data}
      Nonce: ${this.nonce}
      Lasthash: ${this.lasthash}
      Hash: ${this.hash}
    `;
  }

  static genesis() {
    return new this("GenesisTime", [], "-----", "somehash", 0);
  }

  static mineBlock(lastblock, data) {
    const lasthash = lastblock.hash;
    const timestamp = Date.now();
    let nonce = 0,
      hash;

    do {
      hash = Block.hash(timestamp, lasthash, data, nonce);
      nonce++;
    } while (hash.substring(0, DIFFICULTY) !== "0".repeat(DIFFICULTY));

    return new this(timestamp, data, lasthash, hash, nonce);
  }

  // to find hash of individual block if we have all the data
  static hash(timestamp, lasthash, data, nonce) {
    return SHA256(`${timestamp}${lasthash}${data}${nonce}`).toString();
  }

  // when we have the block(wrapper function)
  static blockHash(block) {
    const { timestamp, lasthash, data, nonce } = block;
    return Block.hash(timestamp, lasthash, data, nonce);
  }
}

module.exports = Block;
