import prisma from "@/config/prisma";
import type { DetailedModule, Module } from "./moduleModel";

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

  async findByIdAsync(id: string): Promise<DetailedModule | null> {
    return prisma.module.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        upvotes: true,
        downvotes: true,
        createdAt: true,
        updatedAt: true,
        User: {
          select: {
            username: true,
          },
        },
      },
    });
  }
}
