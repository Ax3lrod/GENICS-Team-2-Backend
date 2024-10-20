import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";
import { LecturerService } from "./lecturerService";

class LecturerController {
  private lecturerService = new LecturerService();

  public getLecturerById: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    const serviceResponse = await this.lecturerService.findById(id);
    handleServiceResponse(serviceResponse, res);
  };
}

export const lecturerController = new LecturerController();
