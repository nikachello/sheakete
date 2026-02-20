"use server";

import { prisma } from "@/lib/prisma";
import { alertEngine } from "@/services/alerts/alert-engine.service";
import { revalidatePath } from "next/cache";

export async function runAlertChecks() {
  try {
    const count = await alertEngine.runAllChecks();
    return { success: true, data: { alertsCreated: count } };
  } catch (error) {
    return { success: false, error: "Failed to run alert checks" };
  }
}

export async function getActiveAlerts() {
  try {
    const data = await prisma.alert.findMany({
      where: { isResolved: false },
      orderBy: [{ severity: "desc" }, { createdAt: "desc" }],
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to get alerts" };
  }
}

export async function resolveAlert(id: string) {
  try {
    await prisma.alert.update({
      where: { id },
      data: { isResolved: true, resolvedAt: new Date() },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to resolve alert" };
  }
}

export async function markAlertRead(id: string) {
  try {
    await prisma.alert.update({
      where: { id },
      data: { isRead: true },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to mark alert as read" };
  }
}
