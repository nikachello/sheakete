"use server";

import { weeklySnapshotService } from "@/services/analytics/weekly-snapshot.service";

export async function captureWeeklySnapshot() {
  try {
    await weeklySnapshotService.captureWeekSnapshot();
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to capture weekly snapshot" };
  }
}

export async function getWeeklyTrends(weeksBack: number = 12) {
  try {
    const data = await weeklySnapshotService.getWeeklyTrends(weeksBack);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to get weekly trends" };
  }
}
