import express from "express";
import cors from "cors";
import { config } from "dotenv";
import http from "http";
import router from "./routes/routes";
import crypto, { Cipher, Decipher } from "crypto";
import { splitCombinedUUIDs, combineUUIDs } from "./utils/crypto";
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
  const uuid1: string = "123e4567-e89b-12d3-a456-426655440000";
  const uuid2: string = "987e6543-e21b-43d2-a458-327655441111";

  // Combine and encrypt UUIDs
  const { iv: generatedIv, encryptedData }: EncryptedData = combineUUIDs(
    uuid1,
    uuid2
  );
  console.log(`Combined and encrypted: ${encryptedData}, IV: ${generatedIv}`);

  // Decrypt and split UUIDs
  const { uuid1: originalUUID1, uuid2: originalUUID2 } = splitCombinedUUIDs(
    generatedIv,
    encryptedData
  );
  console.log(`Decrypted and split UUID1: ${originalUUID1}`);
  console.log(`Decrypted and split UUID2: ${originalUUID2}`);
});

const options: any = { useNewUrlParser: true, useUnifiedTopology: true };
