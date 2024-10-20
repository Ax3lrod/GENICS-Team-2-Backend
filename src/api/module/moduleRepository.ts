import prisma from '@/config/prisma';
import type { Module } from "./moduleModel";

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
