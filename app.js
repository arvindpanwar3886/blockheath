const Blockchain = require("./blockchain");

const bc = new Blockchain();

for (let i = 0; i < 10; i++) {
  bc.addBlock(`${Date.now()}dudududu`);
}

for (let i = 0; i < bc.chain.length; i++) {
  console.log(bc.chain[i].getBlock());
}
