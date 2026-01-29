/*
  Warnings:

  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('LEAD', 'ORDER');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'NO_ANSWER', 'CANCELLED', 'CONFIRMED', 'RECEIVED', 'SHIPPED', 'PAID', 'REFUNDED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "notes" TEXT,
ADD COLUMN     "type" "OrderType" NOT NULL DEFAULT 'LEAD',
ALTER COLUMN "productTitle" DROP NOT NULL,
ALTER COLUMN "comboDetails" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDING';
