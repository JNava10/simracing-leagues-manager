/*
  Warnings:

  - Made the column `bannedAt` on table `leagueban` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `championshipcategories` ADD COLUMN `eventChampionshipId` INTEGER NULL;

-- AlterTable
ALTER TABLE `championshipentry` ADD COLUMN `eventChampionshipId` INTEGER NULL;

-- AlterTable
ALTER TABLE `leagueban` MODIFY `bannedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);

-- CreateTable
CREATE TABLE `LeagueEvent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `leagueId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `authorId` INTEGER NOT NULL,
    `layoutId` INTEGER NOT NULL,
    `simulatorId` INTEGER NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventTeam` (
    `eventId` INTEGER NOT NULL,
    `teamId` INTEGER NOT NULL,

    PRIMARY KEY (`eventId`, `teamId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LeagueEvent` ADD CONSTRAINT `LeagueEvent_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeagueEvent` ADD CONSTRAINT `LeagueEvent_leagueId_fkey` FOREIGN KEY (`leagueId`) REFERENCES `League`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeagueEvent` ADD CONSTRAINT `LeagueEvent_simulatorId_fkey` FOREIGN KEY (`simulatorId`) REFERENCES `SimulatorGame`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeagueEvent` ADD CONSTRAINT `LeagueEvent_layoutId_fkey` FOREIGN KEY (`layoutId`) REFERENCES `TrackLayout`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventTeam` ADD CONSTRAINT `EventTeam_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `LeagueEvent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventTeam` ADD CONSTRAINT `EventTeam_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipCategories` ADD CONSTRAINT `ChampionshipCategories_eventChampionshipId_fkey` FOREIGN KEY (`eventChampionshipId`) REFERENCES `LeagueEvent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipEntry` ADD CONSTRAINT `ChampionshipEntry_eventChampionshipId_fkey` FOREIGN KEY (`eventChampionshipId`) REFERENCES `LeagueEvent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
