-- CreateTable
CREATE TABLE `fotos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` LONGTEXT NOT NULL,
    `public_id` LONGTEXT NOT NULL,
    `format` LONGTEXT NOT NULL,
    `resource_type` LONGTEXT NOT NULL,
    `publicaciones_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `fotos` ADD CONSTRAINT `fotos_publicaciones_id_fkey` FOREIGN KEY (`publicaciones_id`) REFERENCES `publicaciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
