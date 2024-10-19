import type { Module } from "@/api/module/moduleModel";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ModuleRepository {
  async findAllAsync(): Promise<Module[]> {
    return prisma.module.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        upvotes: true,
        downvotes: true,
      },
    });
  }
}
