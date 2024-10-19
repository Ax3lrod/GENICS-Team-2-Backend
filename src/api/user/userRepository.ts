import { PrismaClient, User as PrismaUser } from '@prisma/client';
import type { User } from "@/api/user/userModel";

const prisma = new PrismaClient();

export class UserRepository {
  async findAllAsync(): Promise<User[]> {
    try {
      const users: PrismaUser[] = await prisma.user.findMany();
      return users;
    } catch (error: unknown) {
      let errorMessage = 'Error fetching users';
      if (error instanceof Error) {
        errorMessage = `${errorMessage}: ${error.message}`;
      }
      throw new Error(errorMessage);
    }
  }

  async findByIdAsync(id: string): Promise<User | null> {
    try {
      const user: PrismaUser | null = await prisma.user.findUnique({
        where: { id },
      });
      return user;
    } catch (error: unknown) {
      let errorMessage = `Error fetching user with ID ${id}`;
      if (error instanceof Error) {
        errorMessage = `${errorMessage}: ${error.message}`;
      }
      throw new Error(errorMessage);
    }
  }
}
