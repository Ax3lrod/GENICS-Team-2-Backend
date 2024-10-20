import { PrismaClient } from "@prisma/client";
import type { Lecturer } from "./lecturerModel";

const prisma = new PrismaClient();

export class LecturerRepository {
  async findAll(): Promise<Lecturer[]> {
    return await prisma.lecturer.findMany({
      select: {
        id: true,
        name: true,
        faculty: true,
        department: true,
        upvotes: true,
        downvotes: true,
      },
    });
  }

  async findById(id: string): Promise<Lecturer | null> {
    return await prisma.lecturer.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        faculty: true,
        department: true,
        upvotes: true,
        downvotes: true,
      },
    });
  }
}
