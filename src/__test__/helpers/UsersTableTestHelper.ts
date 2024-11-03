import prisma from "@/config/prisma";

export const UsersTableTestHelper = {
  async insertUser({
    id = "user-123",
    username = "genics",
    email = "genics@example.com",
    faculty = "Computer Science",
    major = "Software Engineering",
    password = "password",
  }) {
    await prisma.user.create({
      data: {
        id,
        username,
        email,
        faculty,
        major,
        password,
      },
    });
  },

  async cleanTable() {
    await prisma.user.deleteMany({});
  },

  async findUserById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  },

  async findAllUsers() {
    return await prisma.user.findMany();
  },
};
