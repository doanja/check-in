-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191),
    `phone` VARCHAR(191) NOT NULL,
    `birthday` VARCHAR(191),
    `points` INTEGER NOT NULL DEFAULT 1,
    `checkins` INTEGER NOT NULL DEFAULT 1,
    `role` ENUM('CUSTOMER', 'ADMIN', 'DEVELOPER') NOT NULL DEFAULT 'CUSTOMER',
    `waitlistId` INTEGER,

    UNIQUE INDEX `User.email_unique`(`email`),
    UNIQUE INDEX `User.phone_unique`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
