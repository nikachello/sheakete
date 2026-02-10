/*
  Warnings:

  - A unique constraint covering the columns `[orderId,type]` on the table `StockMovement` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "StockMovementType" ADD VALUE 'RESERVATION_RELEASE';

-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Stock_productId_idx" ON "Stock"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "StockMovement_orderId_type_key" ON "StockMovement"("orderId", "type");
