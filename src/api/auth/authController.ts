import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";
import type { User } from "../user/userModel";
import { authService } from "./authService";
// import { RegisterRequest } from "./authModel";

class AuthController {
  public register: RequestHandler = async (req: Request, res: Response) => {
    // console.log('WOOOOIIII', req.body);
    const serviceResponse = await authService.register(req.body as User);
    handleServiceResponse(serviceResponse, res);
  };

  public login: RequestHandler = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const serviceResponse = await authService.login(username, password);
    handleServiceResponse(serviceResponse, res);
  };
}

export const authController = new AuthController();
