import { CommentRepository } from "./commentRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";

class CommentService {
  private commentRepository: CommentRepository;

  constructor(repository: CommentRepository = new CommentRepository()) {
    this.commentRepository = repository;
  }

  async findByModuleId(moduleId: string) {
    try {
      const comments = await this.commentRepository.findByModuleId(moduleId);
      return ServiceResponse.success("Comments found", comments);
    } catch (error) {
      return ServiceResponse.failure("Error retrieving comments", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async findByLecturerId(lecturerId: string) {
    try {
      const comments = await this.commentRepository.findByLecturerId(lecturerId);
    //   console.log("on service: " + comments)
      return ServiceResponse.success("Comments found", comments);
    } catch (error) {
      return ServiceResponse.failure("Error retrieving comments", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async createComment(data: { userId: string; moduleId?: string; lecturerId?: string; feedback: string; rating: number }) {
    try {
      const comment = await this.commentRepository.createComment(data);
      return ServiceResponse.success("Comment created", comment, StatusCodes.CREATED);
    } catch (error) {
      return ServiceResponse.failure("Error creating comment", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteComment(commentId: string) {
    try {
      await this.commentRepository.deleteComment(commentId);
      return ServiceResponse.success("Comment deleted", null);
    } catch (error) {
      return ServiceResponse.failure("Error deleting comment", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export const commentService = new CommentService();
