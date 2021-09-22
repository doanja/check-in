-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191),
    `phone` VARCHAR(191) NOT NULL,
    `birthday` VARCHAR(191),
    `points` INTEGER NOT NULL DEFAULT 1,
    `checkInCount` INTEGER NOT NULL DEFAULT 1,
    `role` ENUM('CUSTOMER', 'ADMIN', 'DEVELOPER') NOT NULL DEFAULT 'CUSTOMER',

    UNIQUE INDEX `User.email_unique`(`email`),
    UNIQUE INDEX `User.phone_unique`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CheckIn` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` VARCHAR(191) NOT NULL,
    `userId` INTEGER DEFAULT -1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
