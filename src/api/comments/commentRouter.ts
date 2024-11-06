import express, { type Router } from "express";
import { authenticateJwt } from "@/common/middleware/authenticateJwt";
import { commentController } from "./commentController";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { CommentSchema } from "./commentModel";

export const commentRegistry = new OpenAPIRegistry();
export const commentRouter: Router = express.Router();

commentRegistry.register("Comment", CommentSchema);

commentRegistry.registerPath({
  method: "get",
  path: "/api/comments/module/{moduleId}",
  tags: ["Comment"],
  summary: "Get comments for a module",
  parameters: [
    { name: "moduleId", in: "path", required: true, schema: { type: "string" } },
  ],
  responses: createApiResponse(z.array(CommentSchema), "Success"),
});

commentRegistry.registerPath({
  method: "get",
  path: "/api/comments/lecturer/{lecturerId}",
  tags: ["Comment"],
  summary: "Get comments for a lecturer",
  parameters: [
    { name: "lecturerId", in: "path", required: true, schema: { type: "string" } },
  ],
  responses: createApiResponse(z.array(CommentSchema), "Success"),
});

commentRegistry.registerPath({
  method: "post",
  path: "/api/comments",
  tags: ["Comment"],
  summary: "Create a comment",
  security: [{ bearerAuth: [] }],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/Comment",
        },
      },
    },
  },
  responses: createApiResponse(CommentSchema, "Success"),
});

commentRegistry.registerPath({
  method: "delete",
  path: "/api/comments/{commentId}",
  tags: ["Comment"],
  summary: "Delete a comment",
  parameters: [
    { name: "commentId", in: "path", required: true, schema: { type: "string" } },
  ],
  security: [{ bearerAuth: [] }],
  responses: createApiResponse(z.object({}), "Success"),
});

commentRouter.get("/module/:moduleId", commentController.getCommentsByModuleId);
commentRouter.get("/lecturer/:lecturerId", commentController.getCommentsByLecturerId);
commentRouter.post("/", authenticateJwt, commentController.createComment);
commentRouter.delete("/:commentId", authenticateJwt, commentController.deleteComment);
