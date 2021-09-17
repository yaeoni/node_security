import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import config from "../../config/config";

// login 직후 -> user 정보 로드
// 재발급 시 -> 만료된 access token 이용
// 원래라면 user type 정의 해야함
const getAT = (user) => {
  const payload = {
    id: user.id,
    role: user.role,
  };

  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: "1m",
  });
};

const getRT = () => {
  return jwt.sign({}, config.jwtSecret, { expiresIn: "10m" });
};

export default {
  getAT,
  getRT,
};
