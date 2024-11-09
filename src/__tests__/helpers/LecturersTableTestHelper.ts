/* istanbul ignore file */
import prisma from "@/config/prisma";

export const LecturersTableTestHelper = {
  async insertLecturer({ name = "genics", faculty = "Computer Science", department = "Information System" }) {
    return await prisma.lecturers.create({
      data: {
        name,
        faculty,
        department,
      },
    });
  },

  async cleanTable() {
    await prisma.lecturers.deleteMany({});
  },

  async findLecturerById(id: string) {
    return await prisma.lecturers.findUnique({ where: { id } });
  },

  async findAllLecturers() {
    return await prisma.lecturers.findMany();
  },
};
