import express, { type Router } from "express";

import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpHandlers";

import { lecturerController } from "./lecturerController";
import { GetLecturerSchema, LecturerSchema } from "./lecturerModel";

export const lecturerRegistry = new OpenAPIRegistry();
export const lecturerRouter: Router = express.Router();

lecturerRegistry.register("Lecturer", LecturerSchema);

lecturerRegistry.registerPath({
  method: "get",
  path: "/api/lecturers",
  tags: ["Lecturer"],
  responses: createApiResponse(z.array(LecturerSchema), "Success"),
});

lecturerRouter.get("/", lecturerController.getLecturers);

lecturerRegistry.registerPath({
  method: "get",
  path: "/api/lecturers/{id}",
  tags: ["Lecturer"],
  request: { params: GetLecturerSchema.shape.params },
  responses: createApiResponse(LecturerSchema, "Success"),
});

lecturerRouter.get("/:id", validateRequest(GetLecturerSchema), lecturerController.getLecturer);
