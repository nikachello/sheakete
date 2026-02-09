/*
  Warnings:

  - You are about to drop the column `firstPurchaseCost` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `inventoryValue` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `isCOGS` on the `StockMovement` table. All the data in the column will be lost.
  - Made the column `isReservation` on table `StockMovement` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "firstPurchaseCost",
DROP COLUMN "inventoryValue",
ALTER COLUMN "averageCost" DROP NOT NULL,
ALTER COLUMN "averageCost" DROP DEFAULT,
ALTER COLUMN "reorderPoint" DROP NOT NULL,
ALTER COLUMN "reorderPoint" DROP DEFAULT,
ALTER COLUMN "reorderQuantity" DROP NOT NULL,
ALTER COLUMN "reorderQuantity" DROP DEFAULT;

-- AlterTable
ALTER TABLE "StockMovement" DROP COLUMN "isCOGS",
ALTER COLUMN "isReservation" SET NOT NULL;
