/*
  Warnings:

  - The primary key for the `Token` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `active` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Token` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Token_userId_idx` ON `Token`;

-- AlterTable
ALTER TABLE `Token` DROP PRIMARY KEY,
    DROP COLUMN `active`,
    DROP COLUMN `id`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD PRIMARY KEY (`userId`, `value`);

-- CreateIndex
CREATE INDEX `Token_userId_value_idx` ON `Token`(`userId`, `value`);
