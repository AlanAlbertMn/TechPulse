-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "about_product" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "brand" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "stock" INTEGER;
