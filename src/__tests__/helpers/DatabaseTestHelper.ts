/* istanbul ignore file */
import prisma from "@/config/prisma";

export const DatabaseTestHelper = {
  async cleanAllTables() {
    await prisma.$transaction([
      prisma.moduleVoteRecords.deleteMany({}),
      prisma.modules.deleteMany({}),
      prisma.users.deleteMany({}),
      prisma.lecturers.deleteMany({}),
    ]);
  },
};
