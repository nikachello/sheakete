"use server";

import { ABCAnalysis } from "@/services/inventory/abc-analysis.service";
import { velocityService } from "@/services/inventory/velocity.service";
import { revalidatePath } from "next/cache";

export async function getABCAnalysis(months: number = 3) {
  try {
    const analysis = await ABCAnalysis.performABCAnalysis(months);
    return { success: true, data: analysis };
  } catch (error) {
    console.error("Failed to get ABC analysis:", error);
    return { success: false, error: "Failed to perform ABC analysis" };
  }
}

export async function getVelocityData() {
  try {
    const data = await velocityService.getVelocityData();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to get velocity data" };
  }
}

export async function getReorderSignals() {
  try {
    const data = await velocityService.getReorderSignals();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to get reorder signals" };
  }
}

export async function triggerVelocityUpdate() {
  try {
    await velocityService.updateStockVelocities();
    revalidatePath("/stocks");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update velocities" };
  }
}
