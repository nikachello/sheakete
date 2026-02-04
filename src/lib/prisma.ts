import { PrismaClient } from "../../generated/prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
    // Provide the accelerateUrl - use your DATABASE_URL since you're not using Accelerate
    accelerateUrl: process.env.DATABASE_URL!,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
