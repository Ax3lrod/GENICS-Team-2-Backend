require("dotenv").config();
import { cleanEnv, email, json, port, str } from "envalid";

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ["development", "test", "production", "staging"] }),
  HOST: str({ default: "localhost" }),
  PORT: port({ default: 3000 }),

  DATABASE_URL: str(),

  JWT_SECRET: str({ default: "d3a2b276f84e9809d39b772f33435ffa1bbf077dd4d8e15a448ec6990814d005" }),
  JWT_EXPIRES_IN: str({ default: "24h" }),

  SMTP_HOST: str(),
  SMTP_PORT: str(),
  SMTP_USER: str(),
  SMTP_PASS: str(),
  SMTP_SECURE: str({ default: "false" }),

  CORS_ORIGIN: str({ default: "http://localhost:3000" }),

  COMMON_RATE_LIMIT_MAX_REQUESTS: str({ default: "20" }),
  COMMON_RATE_LIMIT_WINDOW_MS: str({ default: "1000" }),
});
