import express = require("express");
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import verifyToken from "../middleware/verifyToken";

const router = express.Router();

// 유효 토큰 검사
router.get("/verify", verifyToken, (req: Request, res: Response) => {
  res.json(req["decoded"]);
});

export default router;
