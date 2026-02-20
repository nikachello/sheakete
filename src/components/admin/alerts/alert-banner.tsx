"use client";

import { resolveAlert } from "@/actions/admin/product-profitability.actions";
import { Alert } from "prisma/generated/prisma/client";

export function AlertBanner({ alerts }: { alerts: Alert[] }) {
  const critical = alerts.filter((a) => a.severity === "CRITICAL");
  const warnings = alerts.filter((a) => a.severity === "WARNING");

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2 mb-6">
      {critical.map((alert) => (
        <div
          key={alert.id}
          className="bg-red-50 border border-red-200 rounded-lg p-4 flex justify-between"
        >
          <div>
            <p className="font-semibold text-red-800">{alert.title}</p>
            <p className="text-red-700 text-sm">{alert.message}</p>
          </div>
          <button onClick={() => resolveAlert(alert.id)}>Dismiss</button>
        </div>
      ))}
      {warnings.map((alert) => (
        <div
          key={alert.id}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex justify-between"
        >
          <div>
            <p className="font-semibold text-yellow-800">{alert.title}</p>
            <p className="text-yellow-700 text-sm">{alert.message}</p>
          </div>
          <button onClick={() => resolveAlert(alert.id)}>Dismiss</button>
        </div>
      ))}
    </div>
  );
}
