import express from "express";
import { config } from "dotenv";
import { getCmp } from "../controller/getCmp";
config();

const router = express.Router();

router.get("/", getCmp);


export default router;
