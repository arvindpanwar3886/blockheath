/*
  Timestamp
  Data
  Hash
  Lasthash

*/
const BlockchainUtil = require('./utils');
const DIFFICULTY = 3,
  MINE_RATE = 2000;

class Block {
  constructor(timestamp, data, lasthash, hash, nonce, difficulty) {
    this.timestamp = timestamp;
    this.data = data;
    this.lasthash = lasthash;
    this.hash = hash;
    this.nonce = nonce;
    this.difficulty = difficulty || DIFFICULTY;
  }

  getBlock() {
    return `Block------
      Timestamp: ${this.timestamp}
      Data: ${this.data}
      Nonce: ${this.nonce}
      Lasthash: ${this.lasthash}
      Hash: ${this.hash}
      Difficulty: ${this.difficulty}
    `;
  }

  static genesis() {
    return new this("GenesisTime", "", "-----", "somehash", 0, DIFFICULTY);
  }

  static mineBlock(lastblock, data) {
    const lasthash = lastblock.hash;
    let { difficulty } = lastblock;
    let nonce = 0,
      hash,
      timestamp;

    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.changeDifficulty(lastblock, timestamp);
      hash = Block.hash(timestamp, lasthash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

    return new this(timestamp, data, lasthash, hash, nonce, difficulty);
  }

  // to find hash of individual block if we have all the data
  static hash(timestamp, lasthash, data, nonce, difficulty) {
    return BlockchainUtil.hash(
      `${timestamp}${lasthash}${data}${nonce}${difficulty}`
    ).toString();
  }

  // when we have the block(wrapper function)
  static blockHash(block) {
    const { timestamp, lasthash, data, nonce, difficulty } = block;
    return Block.hash(timestamp, lasthash, data, nonce, difficulty);
  }

  static changeDifficulty(lastblock, currentTime) {
    let { difficulty } = lastblock;
    difficulty =
      lastblock.timestamp + MINE_RATE > currentTime
        ? difficulty + 1
        : difficulty - 1;
    return difficulty;
  }
}

module.exports = Block;
