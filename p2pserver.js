const ws = require("ws");
const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];

class P2pServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
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

      this.blockchain.replaceChain(data); // data is incoming chain
    });
  }

  sendChain(socket) {
    // share the blockchain with every connected socket.
    socket.send(JSON.stringify(this.blockchain.chain));
  }

  syncChain() {
    this.sockets.forEach(socket => {
      this.sendChain(socket);
    });
  }
}

module.exports = P2pServer;
