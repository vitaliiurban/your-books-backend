-- CreateTable
CREATE TABLE `books` (
    `id` VARCHAR(8) NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `author` VARCHAR(50) NOT NULL,
    `year` YEAR NOT NULL,
    `publisher` VARCHAR(120) NULL,
    `image` VARCHAR(250) NULL,
    `rating` INTEGER NOT NULL,
    `description` VARCHAR(2500) NULL,
    `genres` INTEGER NOT NULL,
    `in_stock` INTEGER NOT NULL,
    `reserved` INTEGER NOT NULL,

    INDEX `books_genres_id_fk`(`genres`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favorites` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `book_id` VARCHAR(8) NOT NULL,
    `user_id` VARCHAR(8) NOT NULL,

    INDEX `favorites_books_id_fk`(`book_id`),
    INDEX `favorites_users_id_fk`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `users` (
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `id` VARCHAR(8) NOT NULL,
    `password` VARCHAR(30) NOT NULL,
    `role` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `users_pk`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_genres_id_fk` FOREIGN KEY (`genres`) REFERENCES `genres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorites` ADD CONSTRAINT `favorites_books_id_fk` FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorites` ADD CONSTRAINT `favorites_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reserves` ADD CONSTRAINT `reserves_books_id_fk` FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reserves` ADD CONSTRAINT `reserves_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
