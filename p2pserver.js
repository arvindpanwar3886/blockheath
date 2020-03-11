const ws = require("ws");
const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];
const MESSAGE_TYPES = {
  chain: "CHAIN",
  transaction: "TRANSACTION",
  clear_transactions: "CLEAR_TRANSACTIONS"
};

class P2pServer {
  constructor(blockchain, transactionPool) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.sockets = [];
  }

  listen() {
    const server = new ws.Server({ port: P2P_PORT });
    console.log(`p2p server running on PORT ${P2P_PORT}`);
    server.on("connection", socket => {
      this.addSocketToList(socket);
      console.log("A new connection is made to this server.");
    });
    this.connectToAllSockets();
  }

  addSocketToList(socket) {
    // add the socket to the socket array whenever a new socket is found
    this.sockets.push(socket);
    // check for incoming data
    this.messageHandler(socket);
    this.sendChain(socket);
  }

  connectToAllSockets() {
    if (peers.length == 0) console.log(`NO PEERS AVAILABLE.`);
    else console.log(`Found ${peers.length} PEER(s), now connecting...`);
    peers.forEach((peer, i) => {
      // ws://localhost:5001
      const socket = new ws(peer);
      socket.on("open", () => {
        this.addSocketToList(socket);
        console.log(`Connected to PEER ${i + 1}`);
      });
    });
  }

  // custom events
  messageHandler(socket) {
    socket.on("message", message => {
      const data = JSON.parse(message);
      console.log("INCOMING MESSAGE", data);
      console.log("BLOKCHAIN IN THIS SERVER", this.blockchain.chain);
      switch (data.type) {
        case MESSAGE_TYPES.chain:
          this.blockchain.replaceChain(data.chain); // data is incoming chain
          break;
        case MESSAGE_TYPES.transaction:
          this.transactionPool.updateOrAddTransaction(data.transaction);
          break;
        case MESSAGE_TYPES.clear_transactions:
          this.transactionPool.clear();
          break;
      }
    });
  }

  sendChain(socket) {
    // share the blockchain with every connected socket.
    socket.send(JSON.stringify({
      type: MESSAGE_TYPES.chain,
      chain: this.blockchain.chain
    }));
  }

  syncChain() {
    this.sockets.forEach(socket => {
      this.sendChain(socket);
    });
  }

  sendTransaction(socket, transaction) {
    socket.send(JSON.stringify({
      type: MESSAGE_TYPES.transaction,
      transaction
    }));
  }

  broadcastTransaction(transaction) {
    this.sockets.forEach(socket => this.sendTransaction(socket, transaction));
  }

  broadcastClearTransaction() {
    this.sockets.forEach(socket => {
      socket.send(JSON.stringify({
        type: MESSAGE_TYPES.clear_transactions
      }));
    });
  }
}

module.exports = P2pServer;
