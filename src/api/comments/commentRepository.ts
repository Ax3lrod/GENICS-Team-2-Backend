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

  async createComment(data: {
    userId: string;
    moduleId?: string | null;
    lecturerId?: string | null;
    feedback: string;
    rating: number;
  }) {
    const newComment = prisma.comments.create({
      data,
    });

    if (data.lecturerId) {
      const newRating = await prisma.comments.aggregate({
        where: { lecturerId: data.lecturerId },
        _avg: { rating: true },
      });

      await prisma.lecturers.update({
        where: { id: data.lecturerId },
        data: { rating: newRating._avg.rating || 0 },
      });
    }

    return newComment;
  }

  async deleteComment(commentId: string) {
    return prisma.comments.delete({
      where: { id: commentId },
    });
  }

  async getModuleComments({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [comments, totalCount] = await prisma.$transaction([
      prisma.comments.findMany({
        where: { lecturerId: null },
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.comments.count({
        where: { lecturerId: null },
      }),
    ]);

    return { comments, totalCount };
  }

  async getLecturerComments({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [comments, totalCount] = await prisma.$transaction([
      prisma.comments.findMany({
        where: { moduleId: null },
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.comments.count({
        where: { lecturerId: null },
      }),
    ]);

    return { comments, totalCount };
  }
}
