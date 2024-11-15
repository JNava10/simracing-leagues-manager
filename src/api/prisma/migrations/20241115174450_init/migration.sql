/*
  Warnings:

  - Added the required column `memberId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `leaguemember` ADD COLUMN `notificationId` INTEGER NULL;

-- AlterTable
ALTER TABLE `notification` ADD COLUMN `memberId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `LeagueBan` (
    `leagueId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `bannedAt` DATETIME(6) NULL,
    `reason` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`leagueId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
