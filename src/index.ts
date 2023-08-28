import express from "express";
import cors from "cors";
import { config } from "dotenv";
import http from "http";
import router from "./routes/routes";
import mongoose from "mongoose";
import { elegantUnpair, elegantPair } from "./utils/crypto";
config();

const port = process.env.PORT || 3030;
const MongoUrl: string = process.env.MONGO_URL || "";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
app.use("/", router);

const server = http.createServer(app);
server.listen(port, async () => {
  console.log(`Server runs on port ${port}`);
  const resp = elegantPair(1001, 2);
  console.log(resp);
  const resp2 = elegantUnpair(resp);
  console.log(resp2);
});

const options: any = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("strictQuery", true);
mongoose.connect(MongoUrl, options);
const connection = mongoose.connection;
connection.on("error", (err) => console.error("connection error: ", err));
connection.once("open", () => {
  console.log("connected to: ", connection.name);
});
