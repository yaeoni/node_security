import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import config from "../../config/config";

export default (req: Request, res: Response) => {
  const token = jwt.sign(
    {
      msg: "토큰이 잘 발급되었슴니다",
      name: "yaewon :)",
    },
    config.jwtSecret,
    {
      expiresIn: "1m", // 만료 기간 : 1분
      issuer: "yaeoni",
    }
  );

  return res.status(200).json({
    success: true,
    msg: "토큰 발급완료",
    token,
  });
};
