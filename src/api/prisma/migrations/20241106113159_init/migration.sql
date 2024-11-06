/*
  Warnings:

  - The primary key for the `roundentry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sessionId` on the `roundentry` table. All the data in the column will be lost.
  - Added the required column `finishState` to the `RoundEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roundId` to the `RoundEntry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `roundentry` DROP FOREIGN KEY `RoundEntry_sessionId_fkey`;

-- AlterTable
ALTER TABLE `roundentry` DROP PRIMARY KEY,
    DROP COLUMN `sessionId`,
    ADD COLUMN `finishState` INTEGER NOT NULL,
    ADD COLUMN `roundId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`driverId`, `roundId`);

-- AddForeignKey
ALTER TABLE `RoundEntry` ADD CONSTRAINT `RoundEntry_roundId_fkey` FOREIGN KEY (`roundId`) REFERENCES `ChampionshipRound`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
