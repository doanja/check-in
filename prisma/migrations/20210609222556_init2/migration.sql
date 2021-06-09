/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Customer`;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191),
    `phoneNumber` INTEGER NOT NULL,
    `birthday` DATETIME(3),
    `points` INTEGER NOT NULL DEFAULT 0,
    `checkins` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `role` ENUM('CUSTOMER', 'ADMIN', 'DEVELOPER') NOT NULL DEFAULT 'CUSTOMER',

    UNIQUE INDEX `User.email_unique`(`email`),
    UNIQUE INDEX `User.phoneNumber_unique`(`phoneNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
