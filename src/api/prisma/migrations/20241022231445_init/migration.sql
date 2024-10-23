/*
  Warnings:

  - You are about to drop the column `trackId` on the `championshipround` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `scoresystem` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `scoresystem` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `scoresystemposition` table. All the data in the column will be lost.
  - You are about to alter the column `score` on the `scoresystemposition` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to drop the `defaultteam` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `layoutId` to the `ChampionshipRound` table without a default value. This is not possible if the table is not empty.
  - Added the required column `simulatorId` to the `LeagueChampionship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `championshipround` DROP COLUMN `trackId`,
    ADD COLUMN `layoutId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `leaguechampionship` ADD COLUMN `simulatorId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `scoresystem` DROP COLUMN `description`,
    DROP COLUMN `name`;

-- AlterTable
ALTER TABLE `scoresystemposition` DROP COLUMN `position`,
    MODIFY `score` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `simulatorgame` MODIFY `picUrl` VARCHAR(255) NULL;

-- DropTable
DROP TABLE `defaultteam`;

-- CreateTable
CREATE TABLE `ChampionshipCategories` (
    `championshipId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`championshipId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `hexColor` VARCHAR(7) NOT NULL,
    `carEntries` INTEGER NULL DEFAULT 2,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChampionshipTeam` (
    `championshipId` INTEGER NOT NULL,
    `teamId` INTEGER NOT NULL,

    PRIMARY KEY (`championshipId`, `teamId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChampionshipPreset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `championshipId` INTEGER NOT NULL,
    `scoreSystemId` INTEGER NOT NULL,
    `authorId` INTEGER NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeagueAuditAction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeagueAuditLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `actionId` INTEGER NOT NULL,
    `target` INTEGER NOT NULL,
    `authorId` INTEGER NOT NULL,
    `date` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LeagueChampionship` ADD CONSTRAINT `LeagueChampionship_simulatorId_fkey` FOREIGN KEY (`simulatorId`) REFERENCES `SimulatorGame`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipCategories` ADD CONSTRAINT `ChampionshipCategories_championshipId_fkey` FOREIGN KEY (`championshipId`) REFERENCES `LeagueChampionship`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipCategories` ADD CONSTRAINT `ChampionshipCategories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeagueAuditLog` ADD CONSTRAINT `LeagueAuditLog_actionId_fkey` FOREIGN KEY (`actionId`) REFERENCES `LeagueAuditAction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeagueAuditLog` ADD CONSTRAINT `LeagueAuditLog_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
