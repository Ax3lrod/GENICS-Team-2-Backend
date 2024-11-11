import express, { type Router } from "express";

import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpHandlers";

import { authController } from "./authController";
import { LoginSchema, RegisterSchema } from "./authModel";

export const authRegistry = new OpenAPIRegistry();
export const authRouter: Router = express.Router();

authRegistry.register("RegisterSchema", RegisterSchema);
authRegistry.register("LoginSchema", LoginSchema);

authRegistry.registerPath({
  method: "post",
  path: "/api/auth/register",
  tags: ["Auth"],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/RegisterSchema",
        },
      },
    },
  },
  responses: createApiResponse(RegisterSchema, "Success"),
});

authRegistry.registerPath({
  method: "post",
  path: "/api/auth/login",
  tags: ["Auth"],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/LoginSchema",
        },
      },
    },
  },
  responses: createApiResponse(LoginSchema, "Success"),
});

authRouter.post("/register", validateRequest(RegisterSchema), authController.register);
authRouter.post("/login", validateRequest(LoginSchema), authController.login);
authRouter.post("/forget-password", authController.forgetPassword);
authRouter.get("/me", authController.me);

