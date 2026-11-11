-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "attribution" JSONB,
ADD COLUMN     "submissionId" TEXT;

-- CreateTable
CREATE TABLE "MetaConversionEvent" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "payload" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "nextAttemptAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lockedUntil" TIMESTAMP(3),
    "leaseToken" TEXT,
    "sentAt" TIMESTAMP(3),
    "lastError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MetaConversionEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MetaConversionEvent_eventId_key" ON "MetaConversionEvent"("eventId");

-- CreateIndex
CREATE INDEX "MetaConversionEvent_status_nextAttemptAt_idx" ON "MetaConversionEvent"("status", "nextAttemptAt");

-- CreateIndex
CREATE UNIQUE INDEX "MetaConversionEvent_orderId_eventName_key" ON "MetaConversionEvent"("orderId", "eventName");

-- CreateIndex
CREATE UNIQUE INDEX "Order_submissionId_key" ON "Order"("submissionId");

-- AddForeignKey
ALTER TABLE "MetaConversionEvent" ADD CONSTRAINT "MetaConversionEvent_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

