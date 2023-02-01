/*
  Warnings:

  - A unique constraint covering the columns `[content]` on the table `Rhyme` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Rhyme_content_key" ON "Rhyme"("content");
