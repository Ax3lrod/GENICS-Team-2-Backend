import express, { type Router } from "express";

import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest, validateRequestQuery } from "@/common/utils/httpHandlers";

import { lecturerController } from "./lecturerController";
import {
  DetailedLecturerSchema,
  GetLecturerSchema,
  LecturerSchema,
  SearchSchema,
  ShortLecturerSchema,
} from "./lecturerModel";

export const lecturerRegistry = new OpenAPIRegistry();
export const lecturerRouter: Router = express.Router();

lecturerRegistry.register("Lecturer", LecturerSchema);

lecturerRegistry.registerPath({
  method: "get",
  path: "/api/lecturers",
  tags: ["Lecturer"],
  responses: createApiResponse(z.array(ShortLecturerSchema), "Success"),
});

lecturerRegistry.registerPath({
  method: "get",
  path: "/api/lecturers/{id}",
  tags: ["Lecturer"],
  request: { params: GetLecturerSchema.shape.params },
  responses: createApiResponse(DetailedLecturerSchema, "Success"),
});

lecturerRegistry.registerPath({
  method: "get",
  path: "/api/lecturers/search",
  tags: ["Lecturer"],
  summary: "Search for lecturers by name",
  description: "Endpoint untuk melakukan pencarian dosen berdasarkan nama.",
  request: {
    query: SearchSchema,
  },
  responses: createApiResponse(z.array(ShortLecturerSchema), "Success"),
});

lecturerRouter.get("/", lecturerController.getLecturers);
lecturerRouter.get("/search", validateRequestQuery(SearchSchema), lecturerController.getLecturersSearch);
lecturerRouter.get("/:id", lecturerController.getLecturer);
