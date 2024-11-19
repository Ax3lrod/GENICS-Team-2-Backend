import type { Prisma } from "@prisma/client";
import { type Lecturers, PrismaClient } from "@prisma/client";
import type { Lecturer } from "./lecturerModel";

const prisma = new PrismaClient();

export class LecturerRepository {
  async findAll(page: number, limit: number, search: string) {
    const skip = (page - 1) * limit;
    const searchFilter: Prisma.LecturersWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { faculty: { contains: search, mode: "insensitive" } },
            { department: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const lecturers = await prisma.lecturers.findMany({
      where: searchFilter,
      skip: skip,
      take: limit,
      select: {
        id: true,
        name: true,
        faculty: true,
        department: true,
        rating: true,
      },
    });

    const totalCounts = await prisma.lecturers.count({
      where: searchFilter,
    });

    const totalPages = Math.ceil(totalCounts / limit);

    return {
      lecturers,
      totalCounts,
      totalPages,
    };
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
