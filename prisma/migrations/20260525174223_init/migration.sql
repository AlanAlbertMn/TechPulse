-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "product_photos" TEXT[] DEFAULT ARRAY[]::TEXT[];
