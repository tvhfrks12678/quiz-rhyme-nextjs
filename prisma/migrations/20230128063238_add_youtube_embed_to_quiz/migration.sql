/*
  Warnings:

  - Added the required column `youtubeEmbed` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "youtubeEmbed" TEXT NOT NULL;
