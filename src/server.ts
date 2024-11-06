import express, { type Express } from "express";

import cors from "cors";
import helmet from "helmet";
import { pino } from "pino";

import { openAPIRouter } from "@/api-docs/openAPIRouter";
import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";

import { lecturerRouter } from "@/api/lecturer/lecturerRouter";
import { moduleRouter } from "@/api/module/moduleRouter";
import { userRouter } from "@/api/user/userRouter";
import { authRouter } from "./api/auth/authRouter";
import { commentRouter } from "./api/comments/commentRouter";

import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";

import passport from "@/common/strategy/passport";
import { env } from "./config/env";

const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
// app.use(rateLimiter);

// Simple ping-pong endpoint
app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

// Routes
app.use("/health-check", healthCheckRouter);

app.use("/api/lecturers", lecturerRouter);
app.use("/api/modules", moduleRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/comments", commentRouter)

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
