import express, { type Router } from "express";

import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";

import { authenticateJwt } from "@/common/middleware/authenticateJwt";
import { moduleController } from "./moduleController";
import { DetailedModuleSchema, ModuleSchema } from "./moduleModel";

export const moduleRegistry = new OpenAPIRegistry();
export const moduleRouter: Router = express.Router();

moduleRegistry.register("Module", ModuleSchema);

moduleRegistry.registerPath({
  method: "get",
  path: "/api/modules",
  tags: ["Module"],
  responses: createApiResponse(z.array(ModuleSchema), "Success"),
});

moduleRegistry.registerPath({
  method: "get",
  path: "/api/modules/{id}",
  tags: ["Module"],
  responses: createApiResponse(DetailedModuleSchema, "Success"),
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "string",
      },
    },
  ],
});

moduleRegistry.registerPath({
  method: "post",
  path: "/api/modules/{id}/upvote",
  tags: ["Module"],
  summary: "Upvote a module",
  description: "Allows a user to upvote a specific module by its ID. Requires JWT authorization.",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "string",
      },
      description: "The ID of the module to upvote",
    },
  ],
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: createApiResponse(z.object({}), "Success"),
});

moduleRegistry.registerPath({
  method: "post",
  path: "/api/modules/{id}/downvotes",
  tags: ["Module"],
  summary: "Upvote a module",
  description: "Allows a user to downvote a specific module by its ID. Requires JWT authorization.",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "string",
      },
      description: "The ID of the module to upvote",
    },
  ],
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: createApiResponse(z.object({}), "Success"),
});

moduleRouter.get("/", moduleController.getModules);
moduleRouter.get("/:id", moduleController.getModuleById);
moduleRouter.post("/:id/upvotes", authenticateJwt, moduleController.postUpvoteModuleById);
moduleRouter.post("/:id/downvotes", authenticateJwt, moduleController.postDownvoteModuleById);
