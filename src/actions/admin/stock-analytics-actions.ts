"use server";

import { ABCAnalysis } from "@/services/inventory/abc-analysis.service";

export async function getABCAnalysis(months: number = 3) {
  try {
    const analysis = await ABCAnalysis.performABCAnalysis(months);
    return { success: true, data: analysis };
  } catch (error) {
    console.error("Failed to get ABC analysis:", error);
    return { success: false, error: "Failed to perform ABC analysis" };
  }
}
