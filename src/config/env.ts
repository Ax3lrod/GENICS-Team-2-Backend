require("dotenv").config();
import { EnvError, cleanEnv, email, json, makeValidator, port, str } from "envalid";

const dbUrl = makeValidator<string>((url: string) => {
  if (process.env.NODE_ENV !== "production" && url.includes("calm-pine")) {
    throw new EnvError("Production database detected, use a development/test database URL!");
  }

  return url;
});

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ["development", "test", "production", "staging"] }),
  HOST: str({ default: "localhost" }),
  PORT: port({ default: 3000 }),

  DATABASE_URL: dbUrl(),

  JWT_SECRET: str(),
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
