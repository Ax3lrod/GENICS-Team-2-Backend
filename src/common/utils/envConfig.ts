import dotenv from "dotenv";

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  HOST: process.env.HOST ?? "localhost",
  PORT: process.env.PORT ?? 3000,
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? "http://localhost:3000",
  COMMON_RATE_LIMIT_MAX_REQUESTS: process.env.COMMON_RATE_LIMIT_MAX_REQUESTS ?? 1000,
  COMMON_RATE_LIMIT_WINDOW_MS: process.env.COMMON_RATE_LIMIT_WINDOW_MS ?? 1000,
  JWT_SECRET: process.env.JWT_SECRET ?? "genicsgenics",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "24h",
};
