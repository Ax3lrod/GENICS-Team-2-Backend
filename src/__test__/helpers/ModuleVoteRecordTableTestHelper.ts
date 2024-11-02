import prisma from "@/config/prisma";
import { VoteType } from "@prisma/client";

export const ModuleVoteRecordTableTestHelper = {
  async insertVoteRecord({
    id = "vote-123",
    voteType = VoteType.UPVOTE,
    userId = "user-123",
    moduleId = "module-123",
  }) {
    await prisma.moduleVoteRecord.create({
      data: {
        id,
        voteType,
        userId,
        moduleId,
      },
    });
  },

  async cleanTable() {
    await prisma.moduleVoteRecord.deleteMany({});
  },

  async findVoteRecordById(id: string) {
    return await prisma.moduleVoteRecord.findUnique({
      where: {
        id,
      },
    });
  },

  async findAllVoteRecords() {
    return await prisma.moduleVoteRecord.findMany();
  },
};
