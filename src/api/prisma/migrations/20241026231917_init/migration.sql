/*
  Warnings:

  - You are about to drop the column `championshipId` on the `championshippreset` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `championshippreset` DROP COLUMN `championshipId`;

-- CreateTable
CREATE TABLE `PresetTeam` (
    `presetId` INTEGER NOT NULL,
    `teamId` INTEGER NOT NULL,

    PRIMARY KEY (`presetId`, `teamId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChampionshipPresetCategories` (
    `presetId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`presetId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PresetTeam` ADD CONSTRAINT `PresetTeam_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PresetTeam` ADD CONSTRAINT `PresetTeam_presetId_fkey` FOREIGN KEY (`presetId`) REFERENCES `ChampionshipPreset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipTeam` ADD CONSTRAINT `ChampionshipTeam_championshipId_fkey` FOREIGN KEY (`championshipId`) REFERENCES `LeagueChampionship`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipTeam` ADD CONSTRAINT `ChampionshipTeam_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipPreset` ADD CONSTRAINT `ChampionshipPreset_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipPresetScores` ADD CONSTRAINT `ChampionshipPresetScores_presetId_fkey` FOREIGN KEY (`presetId`) REFERENCES `ChampionshipPreset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipPresetLayouts` ADD CONSTRAINT `ChampionshipPresetLayouts_presetId_fkey` FOREIGN KEY (`presetId`) REFERENCES `ChampionshipPreset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipPresetCategories` ADD CONSTRAINT `ChampionshipPresetCategories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipPresetCategories` ADD CONSTRAINT `ChampionshipPresetCategories_presetId_fkey` FOREIGN KEY (`presetId`) REFERENCES `ChampionshipPreset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
