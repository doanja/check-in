/*
  Warnings:

  - You are about to drop the column `checkins` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `checkins`,
    ADD COLUMN `checkInCount` INTEGER NOT NULL DEFAULT 1;
