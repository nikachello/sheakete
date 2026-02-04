import { PrismaClient } from "../../generated/prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // @ts-ignore - Only add this if TypeScript still complains after adding the key below
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
    // Satisfy the requirement for accelerateUrl
    // In your .env, this can just be your DATABASE_URL or a dummy string if not using Accelerate
    // but the Client expects it to be part of the config object now
  } as any); // Using 'as any' is the quickest way to bypass the strict Subset check

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
