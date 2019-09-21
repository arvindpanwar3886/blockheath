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

  static mineBlock(lastblock: Block, data: string) {
    const lasthash = lastblock.hash;
    const timestamp = Date.now().toString();
    const hash = sha256(lasthash + data + timestamp).toString();
    return new Block(timestamp, lasthash, hash, data);
  }
}
