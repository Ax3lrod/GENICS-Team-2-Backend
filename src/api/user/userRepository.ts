import prisma from '@/config/prisma';
import type { User } from "./userModel";

export class UserRepository {
  async findAllAsync(): Promise<User[]> {
    return await prisma.user.findMany({
      select: {
        id: true,
        username: true,
      },
    });
  }

  async findByIdAsync(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        uploadedModules: {
          select: {
            id: true,
            title: true,
          },
        },
        votes: {
          select: {
            id: true,
            voteType: true,
            module: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
    });
  }
}
