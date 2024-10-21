import { handleServiceResponse, validateRequest } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";
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
}

export const moduleController = new ModuleController();
