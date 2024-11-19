import prisma from "@/config/prisma";
import type { Prisma } from "@prisma/client";
import { type ModuleVoteRecords, VoteType } from "@prisma/client";
import type { DetailedModule, Module, ModuleSearchQuery, PostModule, ShortModule } from "./moduleModel";

export class ModuleRepository {
  async addModule(userId: string, payload: ShortModule) {
    return prisma.modules.create({
      data: {
        ...payload,
        userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        faculty: true,
        department: true,
        course: true,
        filePath: true,
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

  async findAllAsync(page: number, limit: number, search: string) {
    const skip = (page - 1) * limit;
    const searchFilter: Prisma.ModulesWhereInput = search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { faculty: { contains: search, mode: "insensitive" } },
            { department: { contains: search, mode: "insensitive" } },
            { course: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const modules = await prisma.modules.findMany({
      where: searchFilter,
      skip: skip,
      take: limit,
      select: {
        id: true,
        title: true,
        description: true,
        faculty: true,
        department: true,
        course: true,
        filePath: true,
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

    const totalCounts = await prisma.modules.count({
      where: searchFilter,
    });

    const totalPages = Math.ceil(totalCounts / limit);

    return {
      modules,
      totalCounts,
      totalPages,
    };
  }

  async findByIdAsync(id: string): Promise<DetailedModule | null> {
    return prisma.modules.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        faculty: true,
        department: true,
        course: true,
        filePath: true,
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

  async findByQuery(query: string, sort: string, order: string): Promise<Module[]> {
    const sortOrder = order === "desc" ? "desc" : "asc";

    const validSortFields = ["faculty", "department", "createdAt"];
    const sortBy = validSortFields.includes(sort) ? sort : "createdAt";

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
      orderBy: {
        [sortBy]: sortOrder,
      },
      select: {
        id: true,
        title: true,
        description: true,
        faculty: true,
        department: true,
        course: true,
        filePath: true,
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
