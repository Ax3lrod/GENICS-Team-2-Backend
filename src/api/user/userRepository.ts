import prisma from "@/config/prisma";
import type { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import type { User } from "./userModel";

export class UserRepository {
  async createUser(username: string, email: string, faculty: string, department: string, password: string) {
    return await prisma.users.create({
      data: {
        username,
        email,
        faculty,
        department,
        password,
      },
    });
  }

  async findAllAsync(page: number, limit: number, search: string) {
    const skip = (page - 1) * limit;
    const searchFilter: Prisma.UsersWhereInput = search
      ? {
          OR: [
            { username: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { faculty: { contains: search, mode: "insensitive" } },
            { department: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const users = await prisma.users.findMany({
      where: searchFilter,
      skip: skip,
      take: limit,
      select: {
        id: true,
        username: true,
        email: true,
        faculty: true,
        department: true,
      },
    });

    const totalCounts = await prisma.users.count({
      where: searchFilter,
    });

    const totalPages = Math.ceil(totalCounts / limit);

    return {
      users,
      totalCounts,
      totalPages,
    };
  }

  async findByIdAsync(id: string) {
    return await prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        faculty: true,
        department: true,
        createdAt: true,
        updatedAt: true,
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
        comments: {
          select: {
            id: true,
            feedback: true,
            rating: true,
            module: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });
  }

  async findByUsername(username: string) {
    return await prisma.users.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        faculty: true,
        department: true,
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

  async findByEmail(email: string) {
    return await prisma.users.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        faculty: true,
        department: true,

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

  async savePasswordResetToken(id: string, token: string) {
    return await prisma.users.update({
      where: { id: id },
      data: {
        passwordResetToken: token,
        passwordResetExpires: new Date(Date.now() + 3600000),
      },
    });
  }

  async findByIdAndToken(id: string, token: string) {
    const user = await prisma.users.findUnique({
      where: { id: id },
      select: {
        id: true,
        passwordResetToken: true,
        passwordResetExpires: true,
      },
    });

    if (user?.passwordResetToken && user.passwordResetExpires && user?.passwordResetExpires > new Date()) {
      const isMatch = await bcrypt.compare(token, user.passwordResetToken);
      if (isMatch) {
        return user;
      }
    }

    return null;
  }

  async resetPassword(id: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return prisma.users.update({
      where: { id: id },
      data: { password: hashedPassword, passwordResetToken: null, passwordResetExpires: null },
    });
  }
}
