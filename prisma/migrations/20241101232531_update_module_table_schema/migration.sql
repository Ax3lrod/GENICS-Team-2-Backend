/*
  Warnings:

  - You are about to drop the column `downvotes` on the `Module` table. All the data in the column will be lost.
  - You are about to drop the column `upvotes` on the `Module` table. All the data in the column will be lost.
  - You are about to drop the `Vote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_lecturerId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_userId_fkey";

-- AlterTable
ALTER TABLE "Module" DROP COLUMN "downvotes",
DROP COLUMN "upvotes",
ADD COLUMN     "downvoteCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "upvoteCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordResetExpires" TIMESTAMP(3),
ADD COLUMN     "passwordResetToken" TEXT;

-- DropTable
DROP TABLE "Vote";

-- CreateTable
CREATE TABLE "ModuleVoteRecord" (
    "id" TEXT NOT NULL,
    "voteType" "VoteType" NOT NULL,
    "userId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,

    CONSTRAINT "ModuleVoteRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ModuleVoteRecord_userId_moduleId_key" ON "ModuleVoteRecord"("userId", "moduleId");

-- AddForeignKey
ALTER TABLE "ModuleVoteRecord" ADD CONSTRAINT "ModuleVoteRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleVoteRecord" ADD CONSTRAINT "ModuleVoteRecord_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
