import prisma from "@/config/prisma";
import { type ModuleVoteRecords, VoteType } from "@prisma/client";
import type { DetailedModule, Module } from "./moduleModel";

export class ModuleRepository {
  async findAllAsync(): Promise<Module[]> {
    return prisma.modules.findMany({
      select: {
        id: true,
        title: true,
        faculty: true,
        major: true,
        course: true,
        description: true,
        upVote: true,
        downVote: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            username: true,
          },
        },
      },
    });
  }

  async findByIdAsync(id: string): Promise<DetailedModule | null> {
    return prisma.modules.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        faculty: true,
        major: true,
        course: true,
        description: true,
        upVote: true,
        downVote: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            username: true,
          },
        },
      },
    });
  }

  async getVoteByUserIdAndModuleId(userId: string, moduleId: string): Promise<ModuleVoteRecords | null> {
    return prisma.moduleVoteRecords.findUnique({
      where: {
        userId_moduleId: {
          userId,
          moduleId,
        },
      },
    });
  }

  async addVote(userId: string, moduleId: string): Promise<ModuleVoteRecords> {
    const vote = await prisma.moduleVoteRecords.create({
      data: {
        userId,
        moduleId,
        voteType: VoteType.UPVOTE,
      },
    });

    await prisma.modules.update({
      where: {
        id: moduleId,
      },
      data: {
        upVote: {
          increment: 1,
        },
      },
    });

    return vote;
  }

  async deleteVote(userId: string, moduleId: string): Promise<ModuleVoteRecords | null> {
    const vote = await prisma.moduleVoteRecords.delete({
      where: {
        userId_moduleId: {
          userId,
          moduleId,
        },
      },
    });

    await prisma.modules.update({
      where: {
        id: moduleId,
      },
      data: {
        upVote: {
          decrement: 1,
        },
      },
    });

    return vote;
  }
}
