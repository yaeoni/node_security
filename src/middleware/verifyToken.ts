import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import config from "../config/config";

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.headers.authorization);
    req["decoded"] = jwt.verify(req.headers.authorization, config.jwtSecret);
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      // 유효기간 초과
      return res.status(419).json({
        success: false,
        message: "토큰이 만료되었습니다.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "유효하지 않은 토큰입니다!",
    });
  }
};
