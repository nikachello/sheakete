-- CreateEnum
CREATE TYPE "ExpenseType" AS ENUM ('MARKETING', 'SALARY', 'RENT', 'SOFTWARE', 'LOGISTICS', 'TAX', 'OTHER');

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "ExpenseType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "reference" TEXT,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "isVirtual" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Expense_type_idx" ON "Expense"("type");

-- CreateIndex
CREATE INDEX "Expense_month_year_idx" ON "Expense"("month", "year");
