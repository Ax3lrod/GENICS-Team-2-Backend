import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";
import { userService } from "./userService";

class UserController {
  public getUsers: RequestHandler = async (req: Request, res: Response) => {
    const page = Number.parseInt(req.query.page as string, 10) || 1;
    const limit = Number.parseInt(req.query.limit as string, 10) || 10;
    const search = (req.query.search as string) || "";

    const serviceResponse = await userService.findAll(page, limit, search);
    handleServiceResponse(serviceResponse, res);
  };

  public getUserById: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const serviceResponse = await userService.findById(id);
    handleServiceResponse(serviceResponse, res);
  };
}

export const userController = new UserController();
