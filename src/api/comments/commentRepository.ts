import prisma from "@/config/prisma";

export class CommentRepository {
  async findByModuleId(moduleId: string) {
    return prisma.comments.findMany({
      where: { moduleId },
    });
  }

  async findByLecturerId(lecturerId: string) {
    return prisma.comments.findMany({
      where: { lecturerId },
    });
  }

  async createComment(data: { userId: string; moduleId?: string; lecturerId?: string; feedback: string; rating: number }) {
    return prisma.comments.create({
      data,
    });
  }

  async deleteComment(commentId: string) {
    return prisma.comments.delete({
      where: { id: commentId },
    });
  }
}
