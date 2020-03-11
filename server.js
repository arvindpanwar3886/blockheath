const express = require("express");
const bodyparser = require("body-parser");
const blockchain = require("./blockchain");
const P2pServer = require("./p2pserver");
const Medic = require('./Medic');
const ReportTransactionPool = require('./report-pool');
const Miner = require('./miner');

const cors = require('cors');

const app = express();
app.use(bodyparser.json());
app.use(cors());
//app.use(bodyparser.urlencoded({ extended: true }));

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const bc = new blockchain();
const medic = new Medic();
const tp = new ReportTransactionPool();
const p2pServer = new P2pServer(bc, tp);
const miner = new Miner(bc, tp, medic, p2pServer);


app.get("/blocks", (req, res) => {
  res.json(bc.chain);
});

app.get('/mine-transactions', (req, res) => {
  const block = miner.mine();
  console.log(`New block added ${block.getBlock()}`);
  res.redirect("/blocks");
});

app.post("/mine", (req, res) => {
  if (!req.body.data) {
    return res.json({
      message: "No Record found!"
    });
  }
  const block = bc.addBlock(req.body.data);
  // console.log(`Block added: ${block.getBlock()}`);
  p2pServer.syncChain();
  res.redirect("/blocks");
});

app.get('/transactions', (req, res) => {
  res.json(tp.transactions);
});

app.post('/transact', (req, res) => {
  const { patient, report } = req.body;
  const transaction = medic.createTransaction(patient, report, tp);
  console.log(transaction);
  p2pServer.broadcastTransaction(transaction);
  res.redirect('/transactions');
});

app.get("/patient-key", (req, res) => {
  res.json({
    patientKey: medic.publicKey
  });
});

app.listen(HTTP_PORT, () => {
  console.log(`Server runnig on PORT ${HTTP_PORT}`);
});
p2pServer.listen();
