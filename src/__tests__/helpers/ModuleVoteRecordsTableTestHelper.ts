/* istanbul ignore file */
import prisma from "@/config/prisma";
import { VoteType } from "@prisma/client";

export const ModuleVoteRecordsTableTestHelper = {
  async insertVoteRecord({
    userId,
    moduleId,
    voteType,
  }: {
    userId: string;
    moduleId: string;
    voteType: VoteType;
  }) {
    const vote = await prisma.moduleVoteRecords.create({
      data: {
        userId,
        moduleId,
        voteType,
      },
    });

    if (vote && vote.voteType === VoteType.UPVOTE) {
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
    } else if (vote && vote.voteType === VoteType.DOWNVOTE) {
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
  },

  async cleanTable() {
    await prisma.moduleVoteRecords.deleteMany({});
  },

  async findVoteRecordById(id: string) {
    return await prisma.moduleVoteRecords.findUnique({
      where: {
        id,
      },
    });
  },

  async findAllVoteRecords() {
    return await prisma.moduleVoteRecords.findMany();
  },
};
