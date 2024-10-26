/*
  Warnings:

  - You are about to drop the `_leaguememberroletouser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `leaguememberrole` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `ChampionshipPreset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ChampionshipPreset` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_leaguememberroletouser` DROP FOREIGN KEY `_LeagueMemberRoleToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_leaguememberroletouser` DROP FOREIGN KEY `_LeagueMemberRoleToUser_B_fkey`;

-- AlterTable
ALTER TABLE `championshippreset` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `imgUrl` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_leaguememberroletouser`;

-- DropTable
DROP TABLE `leaguememberrole`;

-- CreateTable
CREATE TABLE `ChampionshipPresetScores` (
    `presetId` INTEGER NOT NULL,
    `scoreSystemId` INTEGER NOT NULL,

    PRIMARY KEY (`presetId`, `scoreSystemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChampionshipPresetLayouts` (
    `presetId` INTEGER NOT NULL,
    `layoutId` INTEGER NOT NULL,

    PRIMARY KEY (`presetId`, `layoutId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ChampionshipPresetScores` ADD CONSTRAINT `ChampionshipPresetScores_scoreSystemId_fkey` FOREIGN KEY (`scoreSystemId`) REFERENCES `ScoreSystem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipPresetLayouts` ADD CONSTRAINT `ChampionshipPresetLayouts_layoutId_fkey` FOREIGN KEY (`layoutId`) REFERENCES `TrackLayout`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
