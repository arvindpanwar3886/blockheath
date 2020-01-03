/*
  Timestamp
  Data
  Hash
  Lasthash

*/

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
    const hash = "hash";
    return new this(timestamp, data, lasthash, hash);
  }
}

module.exports = Block;
