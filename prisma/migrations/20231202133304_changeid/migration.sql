/*
  Warnings:

  - The primary key for the `books` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `books` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(8) NOT NULL,
    ADD PRIMARY KEY (`id`);

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
