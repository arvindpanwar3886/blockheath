const EC = require('elliptic').ec;
const uuidv1 = require('uuid/v1');
const ec = new EC('secp256k1');
const SHA256 = require("crypto-js/sha256");

class BlockchainUtil {
  static genKeyPair() {
    return ec.genKeyPair();
  }

  static id() {
    return uuidv1();
  }

  static hash(data) {
    return SHA256(JSON.stringify(data)).toString();
  }

  verifySignature(publicKey, signature, dataHash) {
    return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature);
  }
}

module.exports = BlockchainUtil;