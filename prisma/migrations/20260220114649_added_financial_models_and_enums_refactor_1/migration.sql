-- CreateEnum
CREATE TYPE "ShippingMode" AS ENUM ('AIR', 'LAND', 'SEA');

-- CreateEnum
CREATE TYPE "InventoryOrderStatus" AS ENUM ('DRAFT', 'ORDERED', 'IN_TRANSIT', 'ARRIVED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "MarketingPlatform" AS ENUM ('FACEBOOK', 'TIKTOK', 'INSTAGRAM', 'GOOGLE', 'ORGANIC', 'OTHER');

-- CreateEnum
CREATE TYPE "AlertSeverity" AS ENUM ('INFO', 'WARNING', 'CRITICAL');

-- CreateEnum
CREATE TYPE "AlertType" AS ENUM ('LOW_STOCK', 'MARGIN_DROP', 'CASH_RUNWAY', 'RETURN_RATE_SPIKE', 'VELOCITY_CHANGE', 'REORDER_SIGNAL');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "followUpAt" TIMESTAMP(3),
ADD COLUMN     "marketingCampaignId" TEXT;

-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "dailyVelocity" DOUBLE PRECISION,
ADD COLUMN     "daysOfStockLeft" DOUBLE PRECISION,
ADD COLUMN     "lastVelocityCalc" TIMESTAMP(3),
ADD COLUMN     "weeklyVelocity" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productTitle" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "unitCost" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryOrder" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,
    "productTitle" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitCostCNY" DOUBLE PRECISION NOT NULL,
    "exchangeRate" DOUBLE PRECISION NOT NULL,
    "unitCostGEL" DOUBLE PRECISION NOT NULL,
    "shippingMode" "ShippingMode" NOT NULL,
    "shippingCostGEL" DOUBLE PRECISION NOT NULL,
    "shippingPerUnit" DOUBLE PRECISION NOT NULL,
    "landedCostGEL" DOUBLE PRECISION NOT NULL,
    "totalInvestment" DOUBLE PRECISION NOT NULL,
    "status" "InventoryOrderStatus" NOT NULL DEFAULT 'DRAFT',
    "orderedAt" TIMESTAMP(3),
    "expectedArrival" TIMESTAMP(3),
    "arrivedAt" TIMESTAMP(3),
    "supplierName" TEXT,
    "supplierLink" TEXT,
    "notes" TEXT,

    CONSTRAINT "InventoryOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketingCampaign" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "platform" "MarketingPlatform" NOT NULL,
    "productId" TEXT,
    "productTitle" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "spend" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "impressions" INTEGER,
    "clicks" INTEGER,
    "leads" INTEGER,
    "notes" TEXT,

    CONSTRAINT "MarketingCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignSpendLog" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "spend" DOUBLE PRECISION NOT NULL,
    "impressions" INTEGER,
    "clicks" INTEGER,
    "notes" TEXT,

    CONSTRAINT "CampaignSpendLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductProfitSnapshot" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "snapshotDate" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,
    "productTitle" TEXT NOT NULL,
    "unitsSold" INTEGER NOT NULL,
    "unitsReturned" INTEGER NOT NULL DEFAULT 0,
    "netUnitsSold" INTEGER NOT NULL,
    "grossRevenue" DOUBLE PRECISION NOT NULL,
    "returnedRevenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "netRevenue" DOUBLE PRECISION NOT NULL,
    "cogsTotal" DOUBLE PRECISION NOT NULL,
    "shippingTotal" DOUBLE PRECISION NOT NULL,
    "marketingSpend" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grossProfit" DOUBLE PRECISION NOT NULL,
    "grossMargin" DOUBLE PRECISION NOT NULL,
    "contributionProfit" DOUBLE PRECISION NOT NULL,
    "contributionMargin" DOUBLE PRECISION NOT NULL,
    "dailyVelocity" DOUBLE PRECISION NOT NULL,
    "periodDays" INTEGER NOT NULL,

    CONSTRAINT "ProductProfitSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashFlowProjection" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectionDate" TIMESTAMP(3) NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "openingBalance" DOUBLE PRECISION NOT NULL,
    "expectedInflows" DOUBLE PRECISION NOT NULL,
    "expectedOutflows" DOUBLE PRECISION NOT NULL,
    "projectedBalance" DOUBLE PRECISION NOT NULL,
    "pendingRemittances" DOUBLE PRECISION NOT NULL,
    "confirmedOrderValue" DOUBLE PRECISION NOT NULL,
    "scheduledExpenses" DOUBLE PRECISION NOT NULL,
    "inventoryCommitments" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,

    CONSTRAINT "CashFlowProjection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alert" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),
    "type" "AlertType" NOT NULL,
    "severity" "AlertSeverity" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "productId" TEXT,
    "productTitle" TEXT,
    "data" JSONB,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyMetricSnapshot" (
    "id" TEXT NOT NULL,
    "weekStart" TIMESTAMP(3) NOT NULL,
    "weekEnd" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalRevenue" DOUBLE PRECISION NOT NULL,
    "totalOrders" INTEGER NOT NULL,
    "deliveredOrders" INTEGER NOT NULL,
    "returnedOrders" INTEGER NOT NULL,
    "cancelledOrders" INTEGER NOT NULL,
    "returnRate" DOUBLE PRECISION NOT NULL,
    "grossProfit" DOUBLE PRECISION NOT NULL,
    "grossMargin" DOUBLE PRECISION NOT NULL,
    "netProfit" DOUBLE PRECISION NOT NULL,
    "netMargin" DOUBLE PRECISION NOT NULL,
    "totalAdSpend" DOUBLE PRECISION NOT NULL,
    "costPerOrder" DOUBLE PRECISION,
    "roas" DOUBLE PRECISION,
    "totalInventoryValue" DOUBLE PRECISION NOT NULL,
    "inventoryTurnover" DOUBLE PRECISION,
    "bankBalance" DOUBLE PRECISION NOT NULL,
    "founderLoanBalance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "WeeklyMetricSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");

-- CreateIndex
CREATE INDEX "OrderItem_productId_idx" ON "OrderItem"("productId");

-- CreateIndex
CREATE INDEX "InventoryOrder_productId_idx" ON "InventoryOrder"("productId");

-- CreateIndex
CREATE INDEX "InventoryOrder_status_idx" ON "InventoryOrder"("status");

-- CreateIndex
CREATE INDEX "InventoryOrder_orderedAt_idx" ON "InventoryOrder"("orderedAt");

-- CreateIndex
CREATE INDEX "MarketingCampaign_productId_idx" ON "MarketingCampaign"("productId");

-- CreateIndex
CREATE INDEX "MarketingCampaign_platform_idx" ON "MarketingCampaign"("platform");

-- CreateIndex
CREATE INDEX "MarketingCampaign_isActive_idx" ON "MarketingCampaign"("isActive");

-- CreateIndex
CREATE INDEX "CampaignSpendLog_campaignId_idx" ON "CampaignSpendLog"("campaignId");

-- CreateIndex
CREATE INDEX "CampaignSpendLog_date_idx" ON "CampaignSpendLog"("date");

-- CreateIndex
CREATE INDEX "ProductProfitSnapshot_productId_idx" ON "ProductProfitSnapshot"("productId");

-- CreateIndex
CREATE INDEX "ProductProfitSnapshot_snapshotDate_idx" ON "ProductProfitSnapshot"("snapshotDate");

-- CreateIndex
CREATE INDEX "CashFlowProjection_projectionDate_idx" ON "CashFlowProjection"("projectionDate");

-- CreateIndex
CREATE INDEX "Alert_isResolved_idx" ON "Alert"("isResolved");

-- CreateIndex
CREATE INDEX "Alert_severity_idx" ON "Alert"("severity");

-- CreateIndex
CREATE INDEX "Alert_type_idx" ON "Alert"("type");

-- CreateIndex
CREATE INDEX "Alert_createdAt_idx" ON "Alert"("createdAt");

-- CreateIndex
CREATE INDEX "WeeklyMetricSnapshot_weekStart_idx" ON "WeeklyMetricSnapshot"("weekStart");

-- CreateIndex
CREATE UNIQUE INDEX "WeeklyMetricSnapshot_weekStart_key" ON "WeeklyMetricSnapshot"("weekStart");

-- CreateIndex
CREATE INDEX "Order_followUpAt_idx" ON "Order"("followUpAt");

-- CreateIndex
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_marketingCampaignId_fkey" FOREIGN KEY ("marketingCampaignId") REFERENCES "MarketingCampaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryOrder" ADD CONSTRAINT "InventoryOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Stock"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignSpendLog" ADD CONSTRAINT "CampaignSpendLog_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "MarketingCampaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
