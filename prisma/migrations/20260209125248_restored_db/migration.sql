-- CreateEnum
CREATE TYPE "BankTransactionType" AS ENUM ('IN', 'OUT');

-- CreateEnum
CREATE TYPE "FounderLoanType" AS ENUM ('COMPANY_OWES_FOUNDER', 'COMPANY_REPAID_FOUNDER');

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "paidFromBank" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "BankTransaction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "BankTransactionType" NOT NULL,
    "remittanceId" TEXT,
    "expenseId" TEXT,
    "note" TEXT,

    CONSTRAINT "BankTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FounderLoanTransaction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "FounderLoanType" NOT NULL,
    "expenseId" TEXT,
    "bankTransactionId" TEXT,
    "note" TEXT,

    CONSTRAINT "FounderLoanTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BankTransaction_expenseId_key" ON "BankTransaction"("expenseId");

-- CreateIndex
CREATE UNIQUE INDEX "FounderLoanTransaction_expenseId_key" ON "FounderLoanTransaction"("expenseId");

-- CreateIndex
CREATE UNIQUE INDEX "FounderLoanTransaction_bankTransactionId_key" ON "FounderLoanTransaction"("bankTransactionId");

-- AddForeignKey
ALTER TABLE "BankTransaction" ADD CONSTRAINT "BankTransaction_remittanceId_fkey" FOREIGN KEY ("remittanceId") REFERENCES "Remittance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankTransaction" ADD CONSTRAINT "BankTransaction_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FounderLoanTransaction" ADD CONSTRAINT "FounderLoanTransaction_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FounderLoanTransaction" ADD CONSTRAINT "FounderLoanTransaction_bankTransactionId_fkey" FOREIGN KEY ("bankTransactionId") REFERENCES "BankTransaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
