-- DropForeignKey
ALTER TABLE "Choice" DROP CONSTRAINT "Choice_rhymeId_fkey";

-- AlterTable
ALTER TABLE "Choice" ALTER COLUMN "rhymeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Choice" ADD CONSTRAINT "Choice_rhymeId_fkey" FOREIGN KEY ("rhymeId") REFERENCES "Rhyme"("id") ON DELETE SET NULL ON UPDATE CASCADE;
