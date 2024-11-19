import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { CommentRepository } from "./commentRepository";

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
      return ServiceResponse.failure(
        "Error retrieving comments",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findByLecturerId(lecturerId: string) {
    try {
      const comments = await this.commentRepository.findByLecturerId(
        lecturerId
      );
      //   console.log("on service: " + comments)
      return ServiceResponse.success("Comments found", comments);
    } catch (error) {
      return ServiceResponse.failure(
        "Error retrieving comments",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createComment(data: {
    userId: string;
    moduleId?: string | null;
    lecturerId?: string | null;
    feedback: string;
    rating: number;
  }) {
    try {
      const comment = await this.commentRepository.createComment(data);
      return ServiceResponse.success(
        "Comment created",
        comment,
        StatusCodes.CREATED
      );
    } catch (error) {
      console.error("Error creating comment:", error);
      return ServiceResponse.failure(
        "Error creating comment",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteComment(commentId: string) {
    try {
      await this.commentRepository.deleteComment(commentId);
      return ServiceResponse.success("Comment deleted", null);
    } catch (error) {
      return ServiceResponse.failure(
        "Error deleting comment",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getModuleComments({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) {
    try {
      const { comments, totalCount } =
        await this.commentRepository.getModuleComments({
          page,
          pageSize,
        });

      return ServiceResponse.success(
        "Module comments retrieved successfully",
        { comments, totalCount },
        StatusCodes.OK
      );
    } catch (error) {
      console.error("Error in getModuleComments service:", error);
      return ServiceResponse.failure(
        "Error retrieving module comments",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getLecturerComments({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) {
    try {
      const { comments, totalCount } =
        await this.commentRepository.getLecturerComments({
          page,
          pageSize,
        });

      return ServiceResponse.success(
        "Lecturer comments retrieved successfully",
        { comments, totalCount },
        StatusCodes.OK
      );
    } catch (error) {
      console.error("Error in getLecturerComments service:", error);
      return ServiceResponse.failure(
        "Error retrieving lecturer comments",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const commentService = new CommentService();
