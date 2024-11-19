/* istanbul ignore file */
import prisma from "@/config/prisma";

export const ModulesTableTestHelper = {
  async insertModule({
    userId,
    title = "title",
    faculty = "faculty",
    department = "department",
    course = "course",
    description = "description",
    filePath = "www.google.com",
  }: {
    userId: string;
    title?: string;
    faculty?: string;
    department?: string;
    course?: string;
    description?: string;
    filePath?: string;
  }) {
    return await prisma.modules.create({
      data: {
        userId,
        title,
        faculty,
        department,
        course,
        description,
        filePath,
      },
    });
  },

  async cleanTable() {
    await prisma.modules.deleteMany({});
  },

  async findModuleById(id: string) {
    return await prisma.modules.findUnique({ where: { id } });
  },

  async findAllModules() {
    return await prisma.modules.findMany();
  },
};
