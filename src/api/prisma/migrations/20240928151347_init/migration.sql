-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subcategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `parentId` INTEGER NOT NULL,
    `description` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(255) NULL,
    `name` VARCHAR(255) NOT NULL,
    `lastname` VARCHAR(255) NOT NULL,
    `secondLastname` VARCHAR(255) NULL,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `email` VARCHAR(255) NULL,
    `profilePicUrl` VARCHAR(255) NULL,

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
    `description` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `category` INTEGER NULL,
    `authorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeagueMemberRole` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeagueChampionship` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `leagueId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `authorId` INTEGER NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChampionshipRound` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `championshipId` INTEGER NOT NULL,
    `trackId` INTEGER NOT NULL,
    `name` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChampionshipEntry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `championshipId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `trackId` INTEGER NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `raceSessionId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SessionEntry` (
    `driverId` INTEGER NOT NULL,
    `sessionId` INTEGER NOT NULL,
    `position` INTEGER NOT NULL,

    PRIMARY KEY (`driverId`, `sessionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RaceSession` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `laps` INTEGER NULL,
    `duration` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DefaultTeam` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `presetName` VARCHAR(255) NOT NULL,
    `teamName` VARCHAR(255) NOT NULL,
    `hexColor` VARCHAR(7) NOT NULL,
    `carEntries` INTEGER NOT NULL DEFAULT 2,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScoreSystem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScoreSystemPosition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `position` VARCHAR(255) NOT NULL,
    `score` VARCHAR(255) NOT NULL,
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
CREATE TABLE `LeagueMember` (
    `leagueId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `accepted` BOOLEAN NOT NULL DEFAULT false,
    `joinedAt` DATETIME(6) NULL,
    `requestedAt` DATETIME(6) NULL,

    PRIMARY KEY (`leagueId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Track` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `country` VARCHAR(3) NOT NULL,
    `location` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TrackLayout` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `parentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SimulatorGame` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `picUrl` VARCHAR(255) NOT NULL,
    `releaseYear` YEAR NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeaguePost` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `authorId` INTEGER NOT NULL,
    `leagueId` INTEGER NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(3) NOT NULL,
    `private` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostComment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` LONGTEXT NOT NULL,
    `authorId` INTEGER NOT NULL,
    `postId` INTEGER NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeaguePostFile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fileUrl` VARCHAR(255) NOT NULL,
    `postId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommentPostFile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fileUrl` VARCHAR(255) NOT NULL,
    `commentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_LeagueMemberRoleToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_LeagueMemberRoleToUser_AB_unique`(`A`, `B`),
    INDEX `_LeagueMemberRoleToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Subcategory` ADD CONSTRAINT `Subcategory_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE `LeagueChampionship` ADD CONSTRAINT `LeagueChampionship_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeagueChampionship` ADD CONSTRAINT `LeagueChampionship_leagueId_fkey` FOREIGN KEY (`leagueId`) REFERENCES `League`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipRound` ADD CONSTRAINT `ChampionshipRound_championshipId_fkey` FOREIGN KEY (`championshipId`) REFERENCES `LeagueChampionship`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipEntry` ADD CONSTRAINT `ChampionshipEntry_championshipId_fkey` FOREIGN KEY (`championshipId`) REFERENCES `LeagueChampionship`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChampionshipEntry` ADD CONSTRAINT `ChampionshipEntry_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_trackId_fkey` FOREIGN KEY (`trackId`) REFERENCES `Track`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_raceSessionId_fkey` FOREIGN KEY (`raceSessionId`) REFERENCES `RaceSession`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SessionEntry` ADD CONSTRAINT `SessionEntry_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SessionEntry` ADD CONSTRAINT `SessionEntry_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScoreSystemPosition` ADD CONSTRAINT `ScoreSystemPosition_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `ScoreSystem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScoreSystemExtra` ADD CONSTRAINT `ScoreSystemExtra_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `ScoreSystem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScoreSystemExtra` ADD CONSTRAINT `ScoreSystemExtra_extraId_fkey` FOREIGN KEY (`extraId`) REFERENCES `ExtraScore`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeagueMember` ADD CONSTRAINT `LeagueMember_leagueId_fkey` FOREIGN KEY (`leagueId`) REFERENCES `League`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeagueMember` ADD CONSTRAINT `LeagueMember_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrackLayout` ADD CONSTRAINT `TrackLayout_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Track`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeaguePost` ADD CONSTRAINT `LeaguePost_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeaguePost` ADD CONSTRAINT `LeaguePost_leagueId_fkey` FOREIGN KEY (`leagueId`) REFERENCES `League`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostComment` ADD CONSTRAINT `PostComment_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostComment` ADD CONSTRAINT `PostComment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `LeaguePost`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeaguePostFile` ADD CONSTRAINT `LeaguePostFile_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `LeaguePost`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentPostFile` ADD CONSTRAINT `CommentPostFile_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `PostComment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LeagueMemberRoleToUser` ADD CONSTRAINT `_LeagueMemberRoleToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `LeagueMemberRole`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LeagueMemberRoleToUser` ADD CONSTRAINT `_LeagueMemberRoleToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
