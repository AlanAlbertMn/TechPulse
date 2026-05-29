/*
  Warnings:

  - You are about to drop the column `delivery` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "delivery",
ADD COLUMN     "delivery_price" TEXT,
ADD COLUMN     "delivery_time" TEXT;
