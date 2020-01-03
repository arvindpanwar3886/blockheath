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
}

module.exports = Block;
