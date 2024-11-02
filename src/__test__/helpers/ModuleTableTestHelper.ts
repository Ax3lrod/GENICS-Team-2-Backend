import prisma from "@/config/prisma";

export const ModuleTestTableHelper = {
  async insertModule({
    id = "module-123",
    title = "Module 1",
    description = "This is the description of module 1",
    upvoteCount = 0,
    downvoteCount = 0,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    await prisma.module.create({
      data: {
        id,
        title,
        description,
        upvoteCount,
        downvoteCount,
        createdAt,
        updatedAt,
      },
    });
  },

  async cleanTable() {
    await prisma.module.deleteMany({});
  },

  async findModuleById(id: string) {
    return await prisma.module.findUnique({ where: { id } });
  },

  async findAllModules() {
    return await prisma.module.findMany();
  },
};
