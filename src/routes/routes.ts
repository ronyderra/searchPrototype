import express, { Request, Response } from "express";
import { UserController } from "./validation";
import { config } from "dotenv";
config();

const router = express.Router();
const validate = new UserController();

router.get("/");

export default router;
