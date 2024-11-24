-- AlterTable
ALTER TABLE `dish` MODIFY `dish_description` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `vendor_documents` ADD COLUMN `document_meta` JSON NULL,
    MODIFY `document` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `vendors` MODIFY `store_address` LONGTEXT NULL,
    MODIFY `store_description` LONGTEXT NULL;
