const express = require("express");
const bodyparser = require("body-parser");
const blockchain = require("./blockchain");
const P2pServer = require("./p2pserver");

const app = express();
app.use(bodyparser.json());
//app.use(bodyparser.urlencoded({ extended: true }));

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const bc = new blockchain();
const p2pServer = new P2pServer(bc);


app.get("/blocks", (req, res) => {
  res.json(bc.chain);
});

app.post("/mine", (req, res) => {
  if (!req.body.data) {
    return res.json({
      message: "No Record found!"
    })
  }
  const block = bc.addBlock(req.body.data);
  console.log(`Block added: ${block.getBlock()}`);
  p2pServer.syncChain();
  res.redirect("/blocks");
});

app.listen(HTTP_PORT, () => {
  console.log(`Server runnig on PORT ${HTTP_PORT}`);
});
p2pServer.listen();
