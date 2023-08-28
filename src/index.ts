import express from "express";
import cors from "cors";
import { config } from "dotenv";
import http from "http";
import router from "./routes/routes";
import { combineUUIDs } from "./utils/crypto";
config();

interface EncryptedData {
  iv: string;
  encryptedData: string;
}

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
  // Example usage
  const uuid1: string = "1ad1fccc-d279-46a0-8980-1d91afd6ba67";
  const uuid2: string = "af7c1fe6-d669-414e-b066-e9733f0de7a8";

  // Combine and encrypt UUIDs
  combineUUIDs(uuid1, uuid2);
});

const options: any = { useNewUrlParser: true, useUnifiedTopology: true };
