-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "product_title" TEXT NOT NULL,
    "asin" TEXT NOT NULL,
    "product_photo" TEXT NOT NULL,
    "product_price" TEXT NOT NULL,
    "product_original_price" TEXT NOT NULL,
    "delivery" TEXT NOT NULL,
    "product_star_rating" DOUBLE PRECISION NOT NULL,
    "product_num_ratings" INTEGER NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_asin_key" ON "Product"("asin");
