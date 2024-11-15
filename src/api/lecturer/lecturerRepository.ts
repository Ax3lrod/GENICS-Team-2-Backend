import { type Lecturers, PrismaClient } from "@prisma/client";
import type { Lecturer } from "./lecturerModel";

const prisma = new PrismaClient();

export class LecturerRepository {
  async findAll(): Promise<Lecturer[]> {
    return await prisma.lecturers.findMany({});
  }

  async findById(id: string): Promise<Lecturer | null> {
    return await prisma.lecturers.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        faculty: true,
        department: true,
        upVote: true,
        downVote: true,
        rating: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findByQuery(query: string, sort: string, order: string): Promise<Lecturer[]> {
    const sortOrder = order === "desc" ? "desc" : "asc";

    const validSortFields = ["department", "faculty", "createdAt"];
    const sortBy = validSortFields.includes(sort) ? sort : "createdAt";

    return await prisma.lecturers.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
    });
  }
}
