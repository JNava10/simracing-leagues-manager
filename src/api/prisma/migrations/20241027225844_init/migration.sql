/*
  Warnings:

  - You are about to drop the `championshippresetscores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `championshippresetscores` DROP FOREIGN KEY `ChampionshipPresetScores_presetId_fkey`;

-- DropForeignKey
ALTER TABLE `championshippresetscores` DROP FOREIGN KEY `ChampionshipPresetScores_scoreSystemId_fkey`;

-- DropTable
DROP TABLE `championshippresetscores`;
