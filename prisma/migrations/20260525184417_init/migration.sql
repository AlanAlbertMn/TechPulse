/*
  Warnings:

  - You are about to drop the column `currency` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `product_num_ratings` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `product_original_price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `product_photo` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `product_price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `product_star_rating` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `product_title` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `unit_count` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `unit_price` on the `Product` table. All the data in the column will be lost.
  - Added the required column `num_ratings` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "currency",
DROP COLUMN "product_num_ratings",
DROP COLUMN "product_original_price",
DROP COLUMN "product_photo",
DROP COLUMN "product_price",
DROP COLUMN "product_star_rating",
DROP COLUMN "product_title",
DROP COLUMN "unit_count",
DROP COLUMN "unit_price",
ADD COLUMN     "num_ratings" INTEGER NOT NULL,
ADD COLUMN     "original_price" DOUBLE PRECISION,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "thumbnail" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
