-- CreateTable
CREATE TABLE `Customer` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191),
    `phoneNumber` INTEGER NOT NULL,
    `birthday` DATETIME(3),
    `points` INTEGER NOT NULL DEFAULT 0,
    `checkins` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `role` ENUM('USER', 'ADMIN', 'DEVELOPER') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `Customer.email_unique`(`email`),
    UNIQUE INDEX `Customer.phoneNumber_unique`(`phoneNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
