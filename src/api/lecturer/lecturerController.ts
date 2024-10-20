import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";
import { lecturerService } from "./lecturerService";

class LecturerController {
  public getLecturers: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await lecturerService.findAll();
    handleServiceResponse(serviceResponse, res);
  };

  public getLecturer: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const serviceResponse = await lecturerService.findById(id);
    handleServiceResponse(serviceResponse, res);
  };
}

export const lecturerController = new LecturerController();
