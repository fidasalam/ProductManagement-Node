-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'FIXED');

-- CreateTable
CREATE TABLE "Discount" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "DiscountType" NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceRule" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PriceRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseRule" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductPurchaseRules" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductDiscounts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductPriceRules" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductPurchaseRules_AB_unique" ON "_ProductPurchaseRules"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductPurchaseRules_B_index" ON "_ProductPurchaseRules"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductDiscounts_AB_unique" ON "_ProductDiscounts"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductDiscounts_B_index" ON "_ProductDiscounts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductPriceRules_AB_unique" ON "_ProductPriceRules"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductPriceRules_B_index" ON "_ProductPriceRules"("B");

-- AddForeignKey
ALTER TABLE "_ProductPurchaseRules" ADD CONSTRAINT "_ProductPurchaseRules_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductPurchaseRules" ADD CONSTRAINT "_ProductPurchaseRules_B_fkey" FOREIGN KEY ("B") REFERENCES "PurchaseRule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductDiscounts" ADD CONSTRAINT "_ProductDiscounts_A_fkey" FOREIGN KEY ("A") REFERENCES "Discount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductDiscounts" ADD CONSTRAINT "_ProductDiscounts_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductPriceRules" ADD CONSTRAINT "_ProductPriceRules_A_fkey" FOREIGN KEY ("A") REFERENCES "PriceRule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductPriceRules" ADD CONSTRAINT "_ProductPriceRules_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
