-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `lastnames` VARCHAR(255) NOT NULL,
    `bio` VARCHAR(255) NOT NULL DEFAULT 'Profile bio.',
    `password` VARCHAR(255) NOT NULL,
    `colorHex` VARCHAR(7) NULL DEFAULT '#ffffff',
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `email` VARCHAR(255) NULL,
    `profileUrl` VARCHAR(255) NOT NULL,
    `bannerUrl` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FavouriteSimulator` (
    `userId` INTEGER NOT NULL,
    `simulatorId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `simulatorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FavouriteCategories` (
    `userId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRole` (
    `userId` INTEGER NOT NULL,
    `roleId` INTEGER NOT NULL,

    PRIMARY KEY (`roleId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AppRole` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `League` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `picUrl` VARCHAR(255) NOT NULL,
    `bannerUrl` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `category` INTEGER NULL,
    `authorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeagueMember` (
    `leagueId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `notificationId` INTEGER NULL,
    `accepted` BOOLEAN NOT NULL DEFAULT false,
    `invited` BOOLEAN NOT NULL DEFAULT false,
    `joinedAt` DATETIME(6) NULL,
    `invitedAt` DATETIME(6) NULL,
    `requestedAt` DATETIME(6) NULL,

    PRIMARY KEY (`leagueId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeagueEvent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `leagueId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `authorId` INTEGER NOT NULL,
    `layoutId` INTEGER NOT NULL,
    `picUrl` VARCHAR(255) NOT NULL,
    `backgroundUrl` VARCHAR(255) NOT NULL,
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

-- CreateTable
CREATE TABLE `LeagueChampionship` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `leagueId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `picUrl` VARCHAR(255) NOT NULL,
    `backgroundUrl` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `authorId` INTEGER NOT NULL,
    `simulatorId` INTEGER NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChampionshipRound` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `championshipId` INTEGER NOT NULL,
    `layoutId` INTEGER NOT NULL,
    `roundNum` INTEGER NOT NULL,
    `name` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `finished` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChampionshipCategory` (
    `championshipId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`championshipId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventCategory` (
    `championshipId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `eventChampionshipId` INTEGER NULL,

    PRIMARY KEY (`championshipId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChampionshipEntry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `championshipId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `gameName` VARCHAR(191) NULL,
    `number` INTEGER NULL,
    `teamId` INTEGER NULL,
    `nacionality` VARCHAR(2) NULL,
    `description` VARCHAR(255) NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `eventChampionshipId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoundEntry` (
    `driverId` INTEGER NOT NULL,
    `finishState` INTEGER NOT NULL,
    `roundId` INTEGER NOT NULL,
    `position` INTEGER NOT NULL,

    PRIMARY KEY (`driverId`, `roundId`)
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
CREATE TABLE `PresetTeam` (
    `presetId` INTEGER NOT NULL,
    `teamId` INTEGER NOT NULL,

    PRIMARY KEY (`presetId`, `teamId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamCategory` (
    `teamId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`teamId`, `categoryId`)
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
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `imgUrl` VARCHAR(191) NULL,
    `scoreSystemId` INTEGER NOT NULL,
    `authorId` INTEGER NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChampionshipPresetLayouts` (
    `presetId` INTEGER NOT NULL,
    `layoutId` INTEGER NOT NULL,

    PRIMARY KEY (`presetId`, `layoutId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChampionshipPresetCategories` (
    `presetId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`presetId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScoreSystem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScoreSystemPosition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `score` INTEGER NOT NULL,
    `parentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExtraScore` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScoreSystemExtra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `extraId` INTEGER NOT NULL,
    `score` VARCHAR(255) NOT NULL,
    `parentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Track` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `country` VARCHAR(2) NOT NULL,
    `location` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TrackLayout` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `lengthKm` DOUBLE NOT NULL,
    `traction` INTEGER NOT NULL DEFAULT 0,
    `braking` INTEGER NOT NULL DEFAULT 0,
    `lateral` INTEGER NOT NULL DEFAULT 0,
    `tyreStress` INTEGER NOT NULL DEFAULT 0,
    `parentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SimulatorGame` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `picUrl` VARCHAR(255) NULL,
    `releaseYear` YEAR NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeagueBan` (
    `leagueId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `bannedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `reason` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`leagueId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BaselineCar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `fuelWasteKm` DOUBLE NOT NULL,
    `engine` VARCHAR(191) NOT NULL,
    `powerHp` INTEGER NOT NULL,
    `weightKg` INTEGER NOT NULL,
    `fuelCapacityLitre` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tyre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `color` VARCHAR(191) NOT NULL,
    `carId` INTEGER NOT NULL,
    `softness` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TyreWear` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tyreId` INTEGER NOT NULL,
    `wearIndex` DOUBLE NOT NULL,
    `performance` DOUBLE NOT NULL,
    `baselineCarId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_LeagueChampionshipToScoreSystem` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_LeagueChampionshipToScoreSystem_AB_unique`(`A`, `B`),
    INDEX `_LeagueChampionshipToScoreSystem_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FavouriteSimulator` ADD CONSTRAINT `FavouriteSimulator_simulatorId_fkey` FOREIGN KEY (`simulatorId`) REFERENCES `SimulatorGame`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavouriteSimulator` ADD CONSTRAINT `FavouriteSimulator_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavouriteCategories` ADD CONSTRAINT `FavouriteCategories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavouriteCategories` ADD CONSTRAINT `FavouriteCategories_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `AppRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `League` ADD CONSTRAINT `League_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeagueMember` ADD CONSTRAINT `LeagueMember_leagueId_fkey` FOREIGN KEY (`leagueId`) REFERENCES `League`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeagueMember` ADD CONSTRAINT `LeagueMember_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE `LeagueChampionship` ADD CONSTRAINT `LeagueChampionship_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeagueChampionship` ADD CONSTRAINT `LeagueChampionship_leagueId_fkey` FOREIGN KEY (`leagueId`) REFERENCES `League`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeagueChampionship` ADD CONSTRAINT `LeagueChampionship_simulatorId_fkey` FOREIGN KEY (`simulatorId`) REFERENCES `SimulatorGame`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipRound` ADD CONSTRAINT `ChampionshipRound_championshipId_fkey` FOREIGN KEY (`championshipId`) REFERENCES `LeagueChampionship`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipRound` ADD CONSTRAINT `ChampionshipRound_layoutId_fkey` FOREIGN KEY (`layoutId`) REFERENCES `TrackLayout`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipCategory` ADD CONSTRAINT `ChampionshipCategory_championshipId_fkey` FOREIGN KEY (`championshipId`) REFERENCES `LeagueChampionship`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipCategory` ADD CONSTRAINT `ChampionshipCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventCategory` ADD CONSTRAINT `EventCategory_eventChampionshipId_fkey` FOREIGN KEY (`eventChampionshipId`) REFERENCES `LeagueEvent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventCategory` ADD CONSTRAINT `EventCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipEntry` ADD CONSTRAINT `ChampionshipEntry_championshipId_fkey` FOREIGN KEY (`championshipId`) REFERENCES `LeagueChampionship`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipEntry` ADD CONSTRAINT `ChampionshipEntry_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipEntry` ADD CONSTRAINT `ChampionshipEntry_eventChampionshipId_fkey` FOREIGN KEY (`eventChampionshipId`) REFERENCES `LeagueEvent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoundEntry` ADD CONSTRAINT `RoundEntry_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoundEntry` ADD CONSTRAINT `RoundEntry_roundId_fkey` FOREIGN KEY (`roundId`) REFERENCES `ChampionshipRound`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PresetTeam` ADD CONSTRAINT `PresetTeam_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PresetTeam` ADD CONSTRAINT `PresetTeam_presetId_fkey` FOREIGN KEY (`presetId`) REFERENCES `ChampionshipPreset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamCategory` ADD CONSTRAINT `TeamCategory_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamCategory` ADD CONSTRAINT `TeamCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipTeam` ADD CONSTRAINT `ChampionshipTeam_championshipId_fkey` FOREIGN KEY (`championshipId`) REFERENCES `LeagueChampionship`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipTeam` ADD CONSTRAINT `ChampionshipTeam_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipPreset` ADD CONSTRAINT `ChampionshipPreset_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipPreset` ADD CONSTRAINT `ChampionshipPreset_scoreSystemId_fkey` FOREIGN KEY (`scoreSystemId`) REFERENCES `ScoreSystem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipPresetLayouts` ADD CONSTRAINT `ChampionshipPresetLayouts_layoutId_fkey` FOREIGN KEY (`layoutId`) REFERENCES `TrackLayout`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipPresetLayouts` ADD CONSTRAINT `ChampionshipPresetLayouts_presetId_fkey` FOREIGN KEY (`presetId`) REFERENCES `ChampionshipPreset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipPresetCategories` ADD CONSTRAINT `ChampionshipPresetCategories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipPresetCategories` ADD CONSTRAINT `ChampionshipPresetCategories_presetId_fkey` FOREIGN KEY (`presetId`) REFERENCES `ChampionshipPreset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScoreSystemPosition` ADD CONSTRAINT `ScoreSystemPosition_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `ScoreSystem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScoreSystemExtra` ADD CONSTRAINT `ScoreSystemExtra_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `ScoreSystem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScoreSystemExtra` ADD CONSTRAINT `ScoreSystemExtra_extraId_fkey` FOREIGN KEY (`extraId`) REFERENCES `ExtraScore`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrackLayout` ADD CONSTRAINT `TrackLayout_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Track`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tyre` ADD CONSTRAINT `Tyre_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `BaselineCar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TyreWear` ADD CONSTRAINT `TyreWear_tyreId_fkey` FOREIGN KEY (`tyreId`) REFERENCES `Tyre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LeagueChampionshipToScoreSystem` ADD CONSTRAINT `_LeagueChampionshipToScoreSystem_A_fkey` FOREIGN KEY (`A`) REFERENCES `LeagueChampionship`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LeagueChampionshipToScoreSystem` ADD CONSTRAINT `_LeagueChampionshipToScoreSystem_B_fkey` FOREIGN KEY (`B`) REFERENCES `ScoreSystem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
