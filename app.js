const Blockchain = require("./blockchain");

const bc = new Blockchain();

for (let i = 0; i < 5; i++) {
  bc.addBlock(`${Date.now()}dudududu`);
}

const bc2 = new Blockchain();

bc2.addBlock("added block on 2nd chain");

console.log(bc.isChainValid(bc2.chain));
