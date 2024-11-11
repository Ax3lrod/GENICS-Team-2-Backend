import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";
import type { User } from "../user/userModel";
import { AuthService, authService } from "./authService";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";

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

  public me: RequestHandler = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];
    const serviceResponse = await authService.getAuthenticatedUser(token);
    handleServiceResponse(serviceResponse, res);
  };

}

export const authController = new AuthController();
