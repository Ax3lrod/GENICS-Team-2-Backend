/*
  Warnings:

  - You are about to drop the column `major` on the `Modules` table. All the data in the column will be lost.
  - You are about to drop the column `major` on the `Users` table. All the data in the column will be lost.
  - Added the required column `department` to the `Modules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Modules" DROP COLUMN "major",
ADD COLUMN     "department" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "major",
ADD COLUMN     "department" TEXT NOT NULL DEFAULT 'default_department';
