import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse, validateRequest } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { GetModuleSchema } from "./moduleModel";
import { moduleService } from "./moduleService";

class ModuleController {
  public getModules: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await moduleService.findAll();
    handleServiceResponse(serviceResponse, res);
  };

  public getModuleById: RequestHandler = async (req: Request, res: Response) => {
    validateRequest(GetModuleSchema);
    const { id } = req.params;

    const serviceResponse = await moduleService.findById(id);
    handleServiceResponse(serviceResponse, res);
  };

  public postUpvoteModuleById: RequestHandler = async (req: any, res: Response) => {
    if (req.user === null || req.user === undefined || !req.user.id) {
      const response = ServiceResponse.failure("Unauthorized user", StatusCodes.UNAUTHORIZED);
      handleServiceResponse(response, res);
      return;
    }

    const userId = req.user.id;
    const moduleId = req.params.id;

    const serviceResponse = await moduleService.upvoteModuleById(userId, moduleId);
    handleServiceResponse(serviceResponse, res);
  };

  public postDownvoteModuleById: RequestHandler = async (req: any, res: Response) => {
    if (req.user === null || req.user === undefined || !req.user.id) {
      const response = ServiceResponse.failure("Unauthorized user", StatusCodes.UNAUTHORIZED);
      handleServiceResponse(response, res);
      return;
    }

    const userId = req.user.id;
    const moduleId = req.params.id;

    const serviceResponse = await moduleService.downvoteModuleById(userId, moduleId);
    handleServiceResponse(serviceResponse, res);
  };
}

export const moduleController = new ModuleController();
