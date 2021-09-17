import express = require("express");
import { Request, Response } from "express";

import redisClient from "../config/redis";

import getTokens from "../controller/v2/getTokens";

import verifyAT from "../middleware/v1/verifyAT";

import verifyRT from "../middleware/v2/verifyRT";

const router = express.Router();

// 로그인 성공 후 가정(로그인 속 로직으로 넣어야함)
// accesss, refresh 모두 리턴
router.get("/getToken", (req, res) => {
  const user = {
    id: "testId",
    role: "testRole",
  };
  const accessToken = getTokens.getAT(user);
  const refreshToken = getTokens.getRT();

  // 레디스에 저장
  redisClient.set(user.id, refreshToken);

  res.json({
    at: accessToken,
    rt: refreshToken,
  });
});

router.get("/verifyAT", verifyAT, (req: Request, res: Response) => {
  res.json(req["decoded"]);
});

router.get("/verifyRT", verifyRT);
export default router;
