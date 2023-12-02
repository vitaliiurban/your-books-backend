-- CreateTable
CREATE TABLE `books` (
    `id` CHAR(8) NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `author` VARCHAR(50) NOT NULL,
    `year` YEAR NOT NULL,
    `publisher` VARCHAR(120) NULL,
    `image` VARCHAR(250) NULL,
    `quantity` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `id` VARCHAR(8) NOT NULL,
    `password` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `users_pk`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
