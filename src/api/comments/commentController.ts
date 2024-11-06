import { ServiceResponse } from "@/common/models/serviceResponse";
import { validateRequest } from "@/common/utils/httpHandlers";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { commentService } from "./commentService";
// import { CreateCommentSchema, GetCommentSchema } from "./commentModel";

class CommentController {
  public getCommentsByModuleId: RequestHandler = async (req: Request, res: Response) => {
    const { moduleId } = req.params;

    const serviceResponse = await commentService.findByModuleId(moduleId);
    handleServiceResponse(serviceResponse, res);
  };

  public getCommentsByLecturerId: RequestHandler = async (req: Request, res: Response) => {
    const { lecturerId } = req.params;
    // console.log("on controller: " + lecturerId)
    const serviceResponse = await commentService.findByLecturerId(lecturerId);
    handleServiceResponse(serviceResponse, res);
  };

  public createComment: RequestHandler = async (req: any, res: Response) => {
    if (req.user === null || req.user === undefined || !req.user.id) {
      const response = ServiceResponse.failure("Unauthorized user", StatusCodes.UNAUTHORIZED);
      handleServiceResponse(response, res);
      return;
    }

    const { moduleId, lecturerId, feedback, rating } = req.body;
    const userId = req.user.id;

    const serviceResponse = await commentService.createComment({
      userId,
      moduleId,
      lecturerId,
      feedback,
      rating,
    });

    handleServiceResponse(serviceResponse, res);
  };

  public deleteComment: RequestHandler = async (req: Request, res: Response) => {
    const { commentId } = req.params;

    const serviceResponse = await commentService.deleteComment(commentId);
    handleServiceResponse(serviceResponse, res);
  };
}

export const commentController = new CommentController();
