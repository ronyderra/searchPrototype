import express from "express";
import cors from "cors";
import { config } from "dotenv";
import http from "http";
import router from "./routes/routes";
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
});

const options: any = { useNewUrlParser: true, useUnifiedTopology: true };