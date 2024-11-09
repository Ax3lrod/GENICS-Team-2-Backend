/* istanbul ignore file */
import { hashManager } from "@/common/utils/hashManager";
import prisma from "@/config/prisma";
import bcrypt from "bcrypt";

export const UsersTableTestHelper = {
  async insertUser({
    username = `user-${Date.now()}`,
    email = `${Date.now()}@example.com`,
    faculty = "Computer Science",
    major = "Software Engineering",
    password = "password",
  }) {
    const hashedPassword = await hashManager.hash(password);

    const user = await prisma.users.create({
      data: {
        username,
        email,
        faculty,
        major,
        password: hashedPassword,
      },
    });

    return user;
  },

  async cleanTable() {
    await prisma.users.deleteMany({});
  },

  async findUserById(id: string) {
    return await prisma.users.findUnique({ where: { id } });
  },

  async findAllUsers() {
    return await prisma.users.findMany();
  },
};
