-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_userId_fkey";

-- DropForeignKey
ALTER TABLE "ModuleVoteRecord" DROP CONSTRAINT "ModuleVoteRecord_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "ModuleVoteRecord" DROP CONSTRAINT "ModuleVoteRecord_userId_fkey";

-- AddForeignKey
ALTER TABLE "ModuleVoteRecord" ADD CONSTRAINT "ModuleVoteRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleVoteRecord" ADD CONSTRAINT "ModuleVoteRecord_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
