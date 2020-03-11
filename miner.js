const ReportTransaction = require('./report-transaction');
const Medic = require("./Medic");

class Miner {
  constructor(blockchain, transactionPool, medic, p2pServer) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.medic = medic;
    this.p2pServer = p2pServer;
  }

  // grab transactions from the pool and create a block out of it, then use p2p server to sync it to the chains and include the block.
  mine() {
    // only valid transactions to be added in the block.
    const validTransactions = this.transactionPool.validTransactions();

    // reward the miner.
    // validTransactions.push(ReportTransaction.rewardTransaction(this.medic, Medic.medichainMedic));

    // create a block 
    const block = this.blockchain.addBlock(validTransactions);

    // sync the chains in the network.
    this.p2pServer.syncChain();

    // clear the transaction pool and sync the pools in the network.
    this.transactionPool.clear();
    this.p2pServer.broadcastClearTransaction();

    return block;
  }
}

module.exports = Miner;