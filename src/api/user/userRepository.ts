import prisma from '@/config/prisma';
import type { User } from "./userModel";

export class UserRepository {
  async createUser(username: string, email: string, faculty: string, major: string, password: string, ) {
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

  async findAllAsync(){
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

  async findByIdAsync(id: string){
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

  async findByUsername(username: string){
    return await prisma.user.findUnique({
      where: { username },
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

  async findByEmail(email: string){
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
}
