-- CreateTable
CREATE TABLE `admin_user` (
    `admin_user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `email_verified` VARCHAR(191) NOT NULL DEFAULT 'NO',
    `password` VARCHAR(255) NOT NULL,
    `is_active` VARCHAR(191) NOT NULL DEFAULT 'YES',
    `last_loggedin` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admin_user_email_key`(`email`),
    PRIMARY KEY (`admin_user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
