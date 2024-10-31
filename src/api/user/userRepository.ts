import prisma from "@/config/prisma";
import bcrypt from "bcrypt";
import type { User } from "./userModel";

export class UserRepository {
  async createUser(username: string, email: string, faculty: string, major: string, password: string) {
    return await prisma.user.create({
      data: {
        username,
        email,
        faculty,
        major,
        password,
      },
    });
  }

  async findAllAsync() {
    return await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        faculty: true,
        major: true,
      },
    });
  }

  async findByIdAsync(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        faculty: true,
        major: true,
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

  async findByUsername(username: string) {
    return await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        faculty: true,
        major: true,
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
    return await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        faculty: true,
        major: true,

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
    return await prisma.user.update({
      where: { id: id },
      data: {
        passwordResetToken: token,
        passwordResetExpires: new Date(Date.now() + 3600000),
      },
    });
  }

  async findByIdAndToken(id: string, token: string) {
    const user = await prisma.user.findUnique({
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
    return prisma.user.update({
      where: { id: id },
      data: { password: hashedPassword, passwordResetToken: null, passwordResetExpires: null },
    });
  }
}
