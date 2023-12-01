/*
  Warnings:

  - The primary key for the `books` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `books` DROP PRIMARY KEY,
    MODIFY `id` CHAR(8) NOT NULL,
    ADD PRIMARY KEY (`id`);
