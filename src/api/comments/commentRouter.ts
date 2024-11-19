import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { authenticateJwt } from "@/common/middleware/authenticateJwt";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { commentController } from "./commentController";
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
    {
      name: "moduleId",
      in: "path",
      required: true,
      schema: { type: "string" },
    },
  ],
  responses: createApiResponse(z.array(CommentSchema), "Success"),
});

commentRegistry.registerPath({
  method: "get",
  path: "/api/comments/lecturer/{lecturerId}",
  tags: ["Comment"],
  summary: "Get comments for a lecturer",
  parameters: [
    {
      name: "lecturerId",
      in: "path",
      required: true,
      schema: { type: "string" },
    },
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
    {
      name: "commentId",
      in: "path",
      required: true,
      schema: { type: "string" },
    },
  ],
  security: [{ bearerAuth: [] }],
  responses: createApiResponse(z.object({}), "Success"),
});

commentRegistry.registerPath({
  method: "get",
  path: "/api/comments/module",
  tags: ["Comment"],
  summary: "Get all comments for modules",
  parameters: [
    {
      name: "page",
      in: "query",
      required: false,
      schema: {
        type: "integer",
        default: 1,
        description: "Page number for pagination. Default is 1.",
      },
    },
    {
      name: "pageSize",
      in: "query",
      required: false,
      schema: {
        type: "integer",
        default: 10,
        description: "Number of comments per page. Default is 10.",
      },
    },
  ],
  responses: createApiResponse(CommentSchema, "Success"),
});

commentRegistry.registerPath({
  method: "get",
  path: "/api/comments/lecturer",
  tags: ["Comment"],
  summary: "Get all comments for lecturers",
  parameters: [
    {
      name: "page",
      in: "query",
      required: false,
      schema: {
        type: "integer",
        default: 1,
        description: "Page number for pagination. Default is 1.",
      },
    },
    {
      name: "pageSize",
      in: "query",
      required: false,
      schema: {
        type: "integer",
        default: 10,
        description: "Number of comments per page. Default is 10.",
      },
    },
  ],
  responses: createApiResponse(CommentSchema, "Success"),
});

commentRouter.get("/module/:moduleId", commentController.getCommentsByModuleId);
commentRouter.get(
  "/lecturer/:lecturerId",
  commentController.getCommentsByLecturerId
);
commentRouter.post("/", authenticateJwt, commentController.createComment);
commentRouter.delete(
  "/:commentId",
  authenticateJwt,
  commentController.deleteComment
);
commentRouter.get("/module", commentController.getModuleComments);
commentRouter.get("/lecturer", commentController.getLecturerComments);
