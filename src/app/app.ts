import express, { Application, Response, Request, NextFunction } from "express";
import bodyParser from "body-parser";
import Block from "../blockchain/Block";
import Blockchain from "../blockchain/Blockchain";

const app: Application = express();

const PORT = process.env.PORT || 3000;

const bc = new Blockchain();

app.use(bodyParser.json());

app.get("/blocks", (req: Request, res: Response, next: NextFunction) => {
  res.json(bc.chain);
});

app.post("/mine", (req: Request, res: Response, next: NextFunction) => {
  const data: string = req.body.data;
  bc.addBlock(data);
  res.redirect("/blocks");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
