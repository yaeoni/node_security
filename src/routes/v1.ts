import express = require("express");
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import verifyToken from "../middleware/verifyToken";
import getToken from "../controller/getToken";
const router = express.Router();

// 토큰 발급
router.get("/get", getToken);

// 유효 토큰 검사
router.get("/verify", verifyToken, (req: Request, res: Response) => {
  res.json(req["decoded"]);
});

//
export default router;
