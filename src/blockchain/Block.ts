import sha256 from "crypto-js/sha256";

export default class Block {
  timestamp: string;
  prevhash: string;
  hash: string;
  data: string;

  constructor(timestamp: string, prevhash: string, hash: string, data: string) {
    this.timestamp = timestamp;
    this.prevhash = prevhash;
    this.hash = hash;
    this.data = data;
  }

  showBlock() {
    return `Block - Timestamp : ${this.timestamp} PreviousHash : ${this.prevhash} Hash : ${this.hash} data : ${this.data}`;
  }

  static createGenesis(): Block {
    return new Block("genesis timestamp", "---", "hash", "genesis data");
  }

  static mineBlock(lastblock: Block, data: string) {
    // add mine algorithm
    const lasthash = lastblock.hash;
    const timestamp = Date.now().toString();
    const blockHash = this.hash(lasthash + timestamp + data);
    return new Block(timestamp, lasthash, blockHash, data);
  }

  static hash(data: string) {
    return sha256(data).toString();
  }
}
