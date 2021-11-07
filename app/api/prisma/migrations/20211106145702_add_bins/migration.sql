-- CreateTable
CREATE TABLE `Bin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `body` LONGTEXT NOT NULL,
    `userId` INTEGER NULL,
    `password` VARCHAR(191) NOT NULL,
    `lang` VARCHAR(191) NOT NULL,
    `visiblity` ENUM('PUBLIC', 'PRIVATE', 'UNLISTED') NOT NULL DEFAULT 'PUBLIC',
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Bin_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SharedUserBin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `binId` INTEGER NOT NULL,
    `accessLevel` ENUM('READ', 'EDIT', 'ADMIN') NOT NULL DEFAULT 'READ',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `session_id` VARCHAR(128) NOT NULL,
    `expires` INTEGER UNSIGNED NOT NULL,
    `data` MEDIUMTEXT NULL,

    PRIMARY KEY (`session_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bin` ADD CONSTRAINT `Bin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SharedUserBin` ADD CONSTRAINT `SharedUserBin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SharedUserBin` ADD CONSTRAINT `SharedUserBin_binId_fkey` FOREIGN KEY (`binId`) REFERENCES `Bin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
