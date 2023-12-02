/*
  Warnings:

  - The primary key for the `books` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `quantity` on the `books` table. All the data in the column will be lost.
  - Added the required column `genres` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `in_stock` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reserved` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `books` DROP PRIMARY KEY,
    DROP COLUMN `quantity`,
    ADD COLUMN `description` VARCHAR(500) NULL,
    ADD COLUMN `genres` INTEGER NOT NULL,
    ADD COLUMN `in_stock` INTEGER NOT NULL,
    ADD COLUMN `reserved` INTEGER NOT NULL,
    MODIFY `id` VARCHAR(8) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `genres` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reserves` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `book_id` VARCHAR(8) NOT NULL,
    `user_id` VARCHAR(8) NOT NULL,

    INDEX `reserves_books_id_fk`(`book_id`),
    INDEX `reserves_users_id_fk`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reserves` ADD CONSTRAINT `reserves_books_id_fk` FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reserves` ADD CONSTRAINT `reserves_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
