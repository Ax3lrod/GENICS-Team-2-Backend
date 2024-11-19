import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";
import { lecturerService } from "./lecturerService";

class LecturerController {
  public getLecturers: RequestHandler = async (req: Request, res: Response) => {
    const page = Number.parseInt(req.query.page as string, 10) || 1;
    const limit = Number.parseInt(req.query.limit as string, 10) || 10;
    const search = (req.query.search as string) || "";

    const serviceResponse = await lecturerService.findAll(page, limit, search);
    handleServiceResponse(serviceResponse, res);
  };

  public getLecturer: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const serviceResponse = await lecturerService.findById(id);
    handleServiceResponse(serviceResponse, res);
  };

  public getLecturersSearch: RequestHandler = async (req: Request, res: Response) => {
    const { query, sort, order } = req.query;
    const serviceResponse = await lecturerService.findByQuery(query as string, sort as string, order as string);
    handleServiceResponse(serviceResponse, res);
  };
}

export const lecturerController = new LecturerController();
