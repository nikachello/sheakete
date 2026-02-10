"use client";

import { StockAlert } from "@/types/stock.types";

interface StockAlertsProps {
  alerts: StockAlert[];
}

export function StockAlerts({ alerts }: StockAlertsProps) {
  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <div
          key={alert.productId}
          className={`p-4 rounded border-l-4 ${
            alert.severity === "CRITICAL"
              ? "bg-red-50 border-red-600"
              : alert.severity === "WARNING"
                ? "bg-orange-50 border-orange-600"
                : "bg-blue-50 border-blue-600"
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="font-bold">{alert.productTitle}</div>
              <div className="text-sm mt-1 space-y-1">
                <div>
                  ადგილზე: <strong>{alert.quantityOnHand}</strong> |
                  დარეზერვებული: <strong>{alert.quantityReserved}</strong> |
                  ხელმისაწვდომი:{" "}
                  <strong
                    className={
                      alert.quantityAvailable <= 0 ? "text-red-600" : ""
                    }
                  >
                    {alert.quantityAvailable}
                  </strong>
                </div>
                <div>
                  გაყიდვები:{" "}
                  <strong>
                    {alert.dailySalesVelocity.toFixed(1)} ცალი/დღეში
                  </strong>
                </div>
                <div>
                  {alert.daysUntilStockout < 1 ? (
                    <span className="text-red-600 font-bold">⚠️ დღეს</span>
                  ) : (
                    <span>
                      დღე ამოწურვამდე:{" "}
                      <strong>{alert.daysUntilStockout.toFixed(1)} დღე</strong>
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div>
              {alert.severity === "CRITICAL" && (
                <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                  სასწრაფოდ ყიდვა
                </button>
              )}
              {alert.severity === "WARNING" && (
                <button className="px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700">
                  ყიდვა
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
