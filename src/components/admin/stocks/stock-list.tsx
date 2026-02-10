"use client";

import { Stock } from "prisma/generated/prisma/client";

interface StockListProps {
  stocks: Stock[];
}

export function StockList({ stocks }: StockListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">პროდუქტი</th>
            <th className="text-right p-2">ადგილზე</th>
            <th className="text-right p-2">დარეზერვებული</th>
            <th className="text-right p-2">ხელმისაწვდომი</th>
            <th className="text-right p-2">საშუალო ფასი</th>
            <th className="text-right p-2">ღირებულება</th>
            <th className="text-center p-2">სტატუსი</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => {
            const available =
              (stock.quantityOnHand || 0) - (stock.quantityReserved || 0);
            const value =
              (stock.quantityOnHand || 0) * (stock.averageCost || 0);

            let status = "🟢";
            let statusText = "კარგია";

            if (available <= 0) {
              status = "🔴";
              statusText = "გაყიდულია";
            } else if (available <= 5) {
              status = "🟡";
              statusText = "ცოტაა";
            }

            return (
              <tr key={stock.id} className="border-b hover:bg-gray-50">
                <td className="p-2">
                  <div className="font-medium">{stock.productTitle}</div>
                  <div className="text-xs text-gray-500">{stock.productId}</div>
                </td>
                <td className="text-right p-2">{stock.quantityOnHand || 0}</td>
                <td className="text-right p-2 text-gray-600">
                  {stock.quantityReserved || 0}
                </td>
                <td className="text-right p-2 font-bold">{available}</td>
                <td className="text-right p-2">
                  ₾{(stock.averageCost || 0).toFixed(2)}
                </td>
                <td className="text-right p-2">₾{value.toFixed(2)}</td>
                <td className="text-center p-2">
                  <span title={statusText}>{status}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
