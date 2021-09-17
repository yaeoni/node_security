import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import config from "../../config/config";
import getTokens from "../../controller/v2/getTokens";

// redis는 promise 지원 X -> promisify 이용해 강제 비동기 처리 해야함
import { promisify } from "util";
import redisClient from "../../config/redis";

// 이미 만료된 토큰을 보내는 것
export default async (req: Request, res: Response, next: NextFunction) => {
  // 만료된 토큰 같이 넣어보냄
  const at: string = req.headers.authorization;
  const rt: string = req.headers.refresh as string;

  if (at == null || rt == null) {
    return res.json({
      msg: "access token과 refresh token 모두 헤더에 넣어 보내주세요!",
    });
  }
  // 만료된 accessToken에서 유저 값 얻어옴
  // 이것도 DTO 필요
  const atPayload = jwt.decode(at) as object;
  console.log(atPayload);

  if (atPayload == null) {
    res.status(401).json({
      success: false,
      msg: "유저정보가 없습니다(=유효한 토큰이 아닙니다)",
    });
  }

  // refreshToken 만료 여부 체크
  // 0. 위에서 얻어온 유저에 대한 refresh token이 맞는지 확인
  // 1. refresh token 유효 확인
  //      O -> at 재발급 / X -> 새로 로그인 해야함
  try {
    const asyncRedis = promisify(redisClient.get).bind(redisClient);

    const data = await asyncRedis(atPayload["id"]);
    if (data != rt) {
      return res.json({
        msg: "등록되지 않은 유저입니다.",
      });
    }
    const rtVerify = jwt.verify(rt, config.jwtSecret);

    // 새롭게 발급 후 기존 refresh와 함께 리턴
    const accessToken = getTokens.getAT({
      id: atPayload["id"],
      role: atPayload["role"],
    });

    return res.json({
      newAt: accessToken,
      rt: rt,
    });
  } catch (err) {
    // 만료 된 토큰일 때
    if (err.name === "TokenExpiredError") {
      res.json({
        msg: "다시 로그인 해야합니다!",
      });
    } else {
      res.json({
        msg: "서버 내부 오류",
      });
    }
  }
};
