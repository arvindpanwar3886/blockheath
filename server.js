const express = require("express");
const bodyparser = require("body-parser");
const blockchain = require("./blockchain");
const P2pServer = require("./p2pserver");
const Medic = require('./Medic');
const ReportTransactionPool = require('./report-pool');
const Miner = require('./miner');

const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyparser.json());
app.use(cors());
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));

// serving static files.
app.use(express.static(path.join(__dirname, "public")));

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const bc = new blockchain();
const medic = new Medic();
const tp = new ReportTransactionPool();
const p2pServer = new P2pServer(bc, tp);
const miner = new Miner(bc, tp, medic, p2pServer);


app.get("/blocks", (req, res) => {
  res.json(bc.chain);
});

app.get("/", (req, res) => {
  res.render('index', { PORT: HTTP_PORT, patientKey: medic.publicKey, chain: bc.chain });
});

app.get("/add-report", (req, res) => {
  res.render('add-report');
});

app.get("/account", (req, res) => {

  const blockData = bc.chain.map((block, i) => {
    if (i >= 1) {
      // console.log(block.data[0].outputs);
      return block.data[0].outputs;
    }
  });

  const reportList = blockData.filter(block => {
    if (block) {
      return block;
    }
  });

  let rep = [];

  for (let i = 0; i < reportList.length; i++) {
    rep = rep.concat(reportList[i]);
  }

  const reports = rep.filter(r => r.address === medic.publicKey);

  res.render('account', { reports });
});

app.get('/mine-transactions', (req, res) => {
  const block = miner.mine();
  console.log(`New block added ${block.getBlock()}`);
  res.redirect("/blocks");
});

app.get("/mine", (req, res) => {
  res.render("mine");
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
  // res.render('report-pool', { transactions: tp.transactions });
});

// app.get('/report-pool', (req, res) => {
//   // res.json(tp.transactions);
//   res.render('report-pool', { transactions: tp.transactions });
// });

app.get('/reports', (req, res) => {
  let reports = medic.getMedicReports(bc);
  res.json(reports);
});

app.post('/transact', (req, res) => {
  const { patientKey, patientName, doctorName, date, patientCondition } = req.body;
  let report;

  report = {
    patientName, doctorName, date, patientCondition
  };
  const transaction = medic.createTransaction(patientKey, report, tp);
  console.log(transaction);
  p2pServer.broadcastTransaction(transaction);
  res.render('add-report');
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
