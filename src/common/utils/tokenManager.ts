import { env } from "@/config/env";
import jwt from "jsonwebtoken";

export const tokenManager = {
  generateToken: (payload: any, secret: string = env.JWT_SECRET, expiresIn: string = env.JWT_EXPIRES_IN) => {
    const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });

    return token;
  },

  verifyToken: (token: string) => {
    const result = jwt.verify(token, env.JWT_SECRET);
    return result;
  },
};
