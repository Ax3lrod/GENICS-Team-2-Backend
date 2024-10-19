import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";
import { moduleService } from "./moduleService";

class ModuleController {
  public getModules: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await moduleService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };
}

export const moduleController = new ModuleController();
