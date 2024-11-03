import prisma from "@/config/prisma";
import { type ModuleVoteRecord, VoteType } from "@prisma/client";
import type { DetailedModule, Module } from "./moduleModel";

export class ModuleRepository {
  async findAllAsync(): Promise<Module[]> {
    return prisma.module.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        upvoteCount: true,
        downvoteCount: true,
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

  async findByIdAsync(id: string): Promise<DetailedModule | null> {
    return prisma.module.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        upvoteCount: true,
        downvoteCount: true,
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

  async getVoteByUserIdAndModuleId(userId: string, moduleId: string): Promise<ModuleVoteRecord | null> {
    return prisma.moduleVoteRecord.findUnique({
      where: {
        userId_moduleId: {
          userId,
          moduleId,
        },
      },
    });
  }

  async addVote(userId: string, moduleId: string): Promise<ModuleVoteRecord> {
    const vote = await prisma.moduleVoteRecord.create({
      data: {
        userId,
        moduleId,
        voteType: VoteType.UPVOTE,
      },
    });

    await prisma.module.update({
      where: {
        id: moduleId,
      },
      data: {
        upvoteCount: {
          increment: 1,
        },
      },
    });

    return vote;
  }

  async deleteVote(userId: string, moduleId: string): Promise<ModuleVoteRecord | null> {
    const vote = await prisma.moduleVoteRecord.delete({
      where: {
        userId_moduleId: {
          userId,
          moduleId,
        },
      },
    });

    await prisma.module.update({
      where: {
        id: moduleId,
      },
      data: {
        upvoteCount: {
          decrement: 1,
        },
      },
    });

    return vote;
  }
}
