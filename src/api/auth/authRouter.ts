import express, { type Router } from "express";

import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";

import { authController } from "./authController";
import { RegisterSchema } from "./authModel";

export const authRegistry = new OpenAPIRegistry();
export const authRouter: Router = express.Router();

authRegistry.register("Auth", RegisterSchema);

authRegistry.registerPath({
  method: "post",
  path: "/api/auth/register",
  tags: ["Auth"],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/Auth",
        },
      },
    },
  },
  responses: createApiResponse(z.array(RegisterSchema), "Success"),
});

authRouter.post("/register", authController.register);
authRouter.post("/forget-password", authController.forgetPassword);
