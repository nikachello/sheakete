-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "analyticsSessionId" TEXT,
ADD COLUMN     "analyticsVisitorId" TEXT;

-- CreateTable
CREATE TABLE "SitePageView" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visitorId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "campaign" TEXT,

    CONSTRAINT "SitePageView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SitePageView_createdAt_idx" ON "SitePageView"("createdAt");

-- CreateIndex
CREATE INDEX "SitePageView_sessionId_createdAt_idx" ON "SitePageView"("sessionId", "createdAt");

-- CreateIndex
CREATE INDEX "SitePageView_visitorId_createdAt_idx" ON "SitePageView"("visitorId", "createdAt");

-- CreateIndex
CREATE INDEX "Order_analyticsSessionId_idx" ON "Order"("analyticsSessionId");

