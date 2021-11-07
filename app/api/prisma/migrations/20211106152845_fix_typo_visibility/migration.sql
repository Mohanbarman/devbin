/*
  Warnings:

  - You are about to drop the column `visiblity` on the `Bin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Bin` DROP COLUMN `visiblity`,
    ADD COLUMN `visibility` ENUM('PUBLIC', 'PRIVATE', 'UNLISTED') NOT NULL DEFAULT 'PUBLIC';
