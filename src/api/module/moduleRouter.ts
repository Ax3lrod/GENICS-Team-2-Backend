import express, { type Router } from "express";

import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";

import { ModuleSchema } from "./moduleModel";
import { moduleController } from "./moduleController";

export const moduleRegistry = new OpenAPIRegistry();
export const moduleRouter: Router = express.Router();

moduleRegistry.register("Module", ModuleSchema);

moduleRegistry.registerPath({
  method: "get",
  path: "/modules",
  tags: ["Module"],
  responses: createApiResponse(z.array(ModuleSchema), "Success"),
});

moduleRouter.get("/", moduleController.getModules);
