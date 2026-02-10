/*
  Warnings:

  - You are about to drop the column `quantity` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `reserved` on the `Stock` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Stock_productId_idx";

-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "quantity",
DROP COLUMN "reserved",
ADD COLUMN     "averageCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "firstPurchaseCost" DOUBLE PRECISION,
ADD COLUMN     "inventoryValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "lastPurchasePrice" DOUBLE PRECISION,
ADD COLUMN     "quantityOnHand" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "quantityReserved" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reorderPoint" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "reorderQuantity" INTEGER NOT NULL DEFAULT 20;

-- AlterTable
ALTER TABLE "StockMovement" ADD COLUMN     "isCOGS" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "totalCost" DOUBLE PRECISION,
ADD COLUMN     "unitCost" DOUBLE PRECISION;
