import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { lecturerController } from "./lecturerController";
import { GetLecturerSchema, LecturerSchema } from "./lecturerModel";

export const lecturerRegistry = new OpenAPIRegistry();
export const lecturerRouter: Router = express.Router();

// Mendaftarkan DosenSchema ke OpenAPI registry
lecturerRegistry.register("Dosen", LecturerSchema);

// Mendaftarkan path untuk mendapatkan dosen berdasarkan ID
lecturerRegistry.registerPath({
  method: "get",
  path: "/api/lecturer/{id}",
  tags: ["Lecturer"],
  request: { params: GetLecturerSchema.shape.params },
  responses: createApiResponse(LecturerSchema, "Success"),
});

// Endpoint untuk mendapatkan dosen berdasarkan ID
lecturerRouter.get("/:id", lecturerController.getLecturerById);

export default lecturerRouter;
