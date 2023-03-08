/*
  Warnings:

  - Added the required column `userId` to the `ImagePost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImagePost" ADD COLUMN     "userId" TEXT NOT NULL;
