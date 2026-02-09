/*
  Warnings:

  - You are about to drop the column `reserver` on the `Stock` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "StockMovementType" ADD VALUE 'RESERVATION';

-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "reserver",
ADD COLUMN     "reserved" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "StockMovement" ADD COLUMN     "isReservation" BOOLEAN DEFAULT false;
