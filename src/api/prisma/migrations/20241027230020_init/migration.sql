-- AddForeignKey
ALTER TABLE `ChampionshipPreset` ADD CONSTRAINT `ChampionshipPreset_scoreSystemId_fkey` FOREIGN KEY (`scoreSystemId`) REFERENCES `ScoreSystem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
