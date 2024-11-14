import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { ZodError, ZodSchema } from "zod";

import { ServiceResponse } from "@/common/models/serviceResponse";

export const handleServiceResponse = (serviceResponse: ServiceResponse<any>, response: Response) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};

export const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate only the request body against the schema
    schema.parse(req.body);
    next();
  } catch (err) {
    const errorMessage = `Invalid input: ${(err as ZodError).errors.map((e) => e.message).join(", ")}`;
    const statusCode = StatusCodes.BAD_REQUEST;
    const serviceResponse = ServiceResponse.failure(errorMessage, null, statusCode);
    handleServiceResponse(serviceResponse, res);
  }
};

export const validateRequestQuery = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.query);
    next();
  } catch (err) {
    const errorMessage = `Invalid input: ${(err as ZodError).errors.map((e) => e.message).join(", ")}`;
    const statusCode = StatusCodes.BAD_REQUEST;
    const serviceResponse = ServiceResponse.failure(errorMessage, null, statusCode);
    handleServiceResponse(serviceResponse, res);
  }
};

export const validateFileUpload = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req);
    next();
  } catch (err) {
    const errorMessage = `Invalid input: ${(err as ZodError).errors.map((e) => e.message).join(", ")}`;
    const statusCode = StatusCodes.BAD_REQUEST;
    const serviceResponse = ServiceResponse.failure(errorMessage, null, statusCode);
    handleServiceResponse(serviceResponse, res);
  }
};
