/*
  Warnings:

  - You are about to alter the column `country` on the `track` table. The data in that column could be lost. The data in that column will be cast from `VarChar(3)` to `VarChar(2)`.
  - You are about to drop the column `lastname` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicUrl` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `secondLastname` on the `user` table. All the data in the column will be lost.
  - Added the required column `roundNum` to the `ChampionshipRound` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastnames` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileUrl` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `nickname` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `championshipentry` ADD COLUMN `nacionality` VARCHAR(2) NULL;

-- AlterTable
ALTER TABLE `championshipround` ADD COLUMN `roundNum` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `track` MODIFY `country` VARCHAR(2) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `lastname`,
    DROP COLUMN `profilePicUrl`,
    DROP COLUMN `secondLastname`,
    ADD COLUMN `bannerUrl` VARCHAR(255) NULL,
    ADD COLUMN `bio` VARCHAR(255) NOT NULL DEFAULT 'Profile bio.',
    ADD COLUMN `colorHex` VARCHAR(7) NULL DEFAULT '#ffffff',
    ADD COLUMN `lastnames` VARCHAR(255) NOT NULL,
    ADD COLUMN `profileUrl` VARCHAR(255) NOT NULL,
    MODIFY `nickname` VARCHAR(255) NOT NULL;
