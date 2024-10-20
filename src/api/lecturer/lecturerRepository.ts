import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class LecturerRepository {
  // Method untuk menemukan dosen berdasarkan ID
  async findById(id: string) {
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
