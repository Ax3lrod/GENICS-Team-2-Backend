import prisma from "@/config/prisma";
import { type ModuleVoteRecords, VoteType } from "@prisma/client";
import type { DetailedModule, ShortModule } from "./moduleModel";

export class ModuleRepository {
  async findAllAsync(): Promise<ShortModule[]> {
    return prisma.modules.findMany({
      select: {
        id: true,
        title: true,
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
        votes: {
          select: {
            id: true,
            voteType: true,
            user: {
              select: {
                id: true,
                username: true,
              },
            },
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

  async addVote(userId: string, moduleId: string, voteType: VoteType): Promise<ModuleVoteRecords> {
    const vote = await prisma.moduleVoteRecords.create({
      data: {
        userId,
        moduleId,
        voteType: voteType,
      },
    });

    if (voteType === VoteType.UPVOTE) {
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
    } else {
      await prisma.modules.update({
        where: {
          id: moduleId,
        },
        data: {
          downVote: {
            increment: 1,
          },
        },
      });
    }

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

    if (vote.voteType === VoteType.UPVOTE) {
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
    } else {
      await prisma.modules.update({
        where: {
          id: moduleId,
        },
        data: {
          downVote: {
            decrement: 1,
          },
        },
      });
    }

    return vote;
  }

  async findByQuery(query: string): Promise<Module[]> {
    return await prisma.modules.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
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
}
