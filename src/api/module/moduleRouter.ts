import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { moduleController } from "./moduleController";
import { ModuleSchema } from "./moduleModel";

export const moduleRegistry = new OpenAPIRegistry();
export const moduleRouter: Router = express.Router();

moduleRegistry.register("Module", ModuleSchema);

moduleRegistry.registerPath({
  method: "get",
  path: "/",
  tags: ["Module"],
  responses: createApiResponse(z.array(ModuleSchema), "Success"),
});

moduleRouter.get("/", moduleController.getModules);
