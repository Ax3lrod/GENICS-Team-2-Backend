/*
  Warnings:

  - You are about to drop the column `fileUrl` on the `Modules` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Modules" DROP COLUMN "fileUrl",
ADD COLUMN     "filePath" TEXT;
