import express = require("express");
import { Request, Response } from "express";

import verifyAT from "../middleware/v1/verifyAT";
import getAT from "../controller/v1/getAT";
const router = express.Router();

// 토큰 발급
router.get("/getToken", getAT);
// 유효 토큰 검사
router.get("/verifyToken", verifyAT, (req: Request, res: Response) => {
  res.json(req["decoded"]);
});

//
export default router;
