const Block = require("./block");

const block = new Block("do", "do", "dum", "dum");

console.log(block.getBlock());
console.log(Block.genesis().getBlock());

console.log(Block.mineBlock(Block.genesis(), "dudududu").getBlock());
