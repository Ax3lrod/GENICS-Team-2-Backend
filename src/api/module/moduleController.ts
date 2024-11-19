import { handleServiceResponse, validateRequest } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";
import type { ModuleSearchQuery } from "./moduleModel";
import { moduleService } from "./moduleService";

class ModuleController {
  public postModule: RequestHandler = async (req: Request, res: Response) => {
    const file = req.file as Express.Multer.File;
    const payload = req.body;
    const user = req.user as Express.User;

    const serviceResponse = await moduleService.addModule(user.id, payload, file);
    handleServiceResponse(serviceResponse, res);
  };

  public getModules: RequestHandler = async (req: Request, res: Response) => {
    const page = Number.parseInt(req.query.page as string, 10) || 1;
    const limit = Number.parseInt(req.query.limit as string, 10) || 10;
    const search = (req.query.search as string) || "";

    const serviceResponse = await moduleService.findAll(page, limit, search);
    handleServiceResponse(serviceResponse, res);
  };

  public getModuleById: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    const serviceResponse = await moduleService.findById(id);
    handleServiceResponse(serviceResponse, res);
  };

  public postUpvoteModuleById: RequestHandler = async (req: Request, res: Response) => {
    const user = req.user as Express.User;
    const userId = user.id;
    const moduleId = req.params.id;

    const serviceResponse = await moduleService.upvoteModuleById(userId, moduleId);
    handleServiceResponse(serviceResponse, res);
  };

  public postDownvoteModuleById: RequestHandler = async (req: Request, res: Response) => {
    const user = req.user as Express.User;
    const userId = user.id;
    const moduleId = req.params.id;

    const serviceResponse = await moduleService.downvoteModuleById(userId, moduleId);
    handleServiceResponse(serviceResponse, res);
  };

  public getModulesSearch: RequestHandler = async (req: Request, res: Response) => {
    const { query, sort, order } = req.query;
    const serviceResponse = await moduleService.findByQuery(query as string, sort as string, order as string);
    handleServiceResponse(serviceResponse, res);
  };
}

export const moduleController = new ModuleController();
