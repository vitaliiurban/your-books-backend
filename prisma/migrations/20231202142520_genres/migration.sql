/*
  Warnings:

  - You are about to drop the column `quantity` on the `books` table. All the data in the column will be lost.
  - Added the required column `genres` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `in_stock` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reserved` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `books` DROP COLUMN `quantity`,
    ADD COLUMN `description` VARCHAR(500) NULL,
    ADD COLUMN `genres` INTEGER NOT NULL,
    ADD COLUMN `in_stock` INTEGER NOT NULL,
    ADD COLUMN `reserved` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `genres` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
