import prisma from "@/config/prisma";
import type { Module } from "@prisma/client";

export const ModuleTestTableHelper = {
  async insertModule({
    id = "module-123",
    title = "title",
    description = "description",
    upvoteCount = 0,
    downvoteCount = 0,
    createdAt = new Date(),
    updatedAt = new Date(),
    userId = "user-123",
  }) {
    return await prisma.module.create({
      data: {
        id,
        title,
        description,
        upvoteCount,
        downvoteCount,
        createdAt,
        updatedAt,
        userId,
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
