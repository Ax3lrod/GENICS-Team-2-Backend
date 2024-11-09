import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";
import type { User } from "../user/userModel";
import { RegisterResponseSchema } from "./authModel";
import { authService } from "./authService";

class AuthController {
  public register: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await authService.register(req.body as User);

    handleServiceResponse(serviceResponse, res);
  };

  public forgetPassword: RequestHandler = async (req: Request, res: Response) => {
    const { email } = req.body;
    const serviceResponse = await authService.forgetPassword(email);
    handleServiceResponse(serviceResponse, res);
  };

  public resetPassword: RequestHandler = async (req: Request, res: Response) => {
    const { id, token, newPassword } = req.body;
    const serviceResponse = await authService.resetPassword(id, token, newPassword);
  };

  public login: RequestHandler = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const serviceResponse = await authService.login(username, password);
    handleServiceResponse(serviceResponse, res);
  };
}

export const authController = new AuthController();
