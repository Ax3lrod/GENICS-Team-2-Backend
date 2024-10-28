import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";
import { authService } from "./authService";
import { User } from "../user/userModel";
// import { RegisterRequest } from "./authModel";

class AuthController {
    public register: RequestHandler = async (req: Request, res: Response) => {
    //   console.log(req.body);
      const serviceResponse = await authService.register(req.body as User);
      handleServiceResponse(serviceResponse, res);
    };
  }
  
  export const authController = new AuthController();