import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateFileUpload, validateRequest, validateRequestQuery } from "@/common/utils/httpHandlers";

import { authenticateJwt } from "@/common/middleware/authenticateJwt";
import { createUploadFileService } from "@/common/utils/createUploadFileService";
import { moduleController } from "./moduleController";

import { autoCreateDirectories } from "@/common/utils/storageService";
import { env } from "@/config/env";
import {
  DetailedModuleSchema,
  ModuleSchema,
  SearchSchema,
  ShortModuleSchema,
  postModuleFileSchema,
  postModuleSchema,
} from "./moduleModel";

export const moduleRegistry = new OpenAPIRegistry();
export const moduleRouter: Router = express.Router();

const uploadStoragePath = autoCreateDirectories(env.MODULE_UPLOAD_STORAGE_PATH);
const uploadFile = createUploadFileService(uploadStoragePath);

moduleRegistry.register("Module", ModuleSchema);

moduleRegistry.registerPath({
  method: "post",
  path: "/api/modules",
  tags: ["Module"],
  summary: "Add a new module",
  description: "Creates a new module with details and an optional file upload. Requires JWT authorization.",
  requestBody: {
    required: true,
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            title: { type: "string", description: "Title of the module" },
            description: { type: "string", description: "Description of the module" },
            faculty: { type: "string", description: "Faculty associated with the module" },
            major: { type: "string", description: "Major associated with the module" },
            course: { type: "string", description: "Course associated with the module" },
            file: {
              type: "string",
              format: "binary",
              description: "File upload for the module",
            },
          },
          required: ["title", "description", "faculty", "major", "course"],
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: createApiResponse(DetailedModuleSchema, "Module created successfully"),
});

moduleRegistry.registerPath({
  method: "get",
  path: "/api/modules",
  tags: ["Module"],
  responses: createApiResponse(z.array(ShortModuleSchema), "Success"),
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
  path: "/api/modules/{id}/upvotes",
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

moduleRegistry.registerPath({
  method: "get",
  path: "/api/modules/search",
  tags: ["Module"],
  summary: "Search for modules by name and description",
  description: "Endpoint untuk melakukan pencarian modul berdasarkan nama dan deskripsi.",
  request: {
    query: SearchSchema,
  },
  responses: createApiResponse(z.array(ShortModuleSchema), "Success"),
});

moduleRouter.post(
  "/",
  authenticateJwt,
  uploadFile.single("file"),
  validateRequest(postModuleSchema),
  validateFileUpload(postModuleFileSchema),
  moduleController.postModule,
);
moduleRouter.get("/", moduleController.getModules);
moduleRouter.get("/search", validateRequestQuery(SearchSchema), moduleController.getModulesSearch);
moduleRouter.get("/:id", moduleController.getModuleById);
moduleRouter.post("/:id/upvotes", authenticateJwt, moduleController.postUpvoteModuleById);
moduleRouter.post("/:id/downvotes", authenticateJwt, moduleController.postDownvoteModuleById);
