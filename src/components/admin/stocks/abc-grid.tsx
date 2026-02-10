"use client";

import { ABCClassification } from "@/services/inventory/abc-analysis.service";

interface ABCGridProps {
  data: ABCClassification[];
}

export function ABCGrid({ data }: ABCGridProps) {
  const aItems = data.filter((d) => d.category === "A");
  const bItems = data.filter((d) => d.category === "B");
  const cItems = data.filter((d) => d.category === "C");

  const aRevenue = aItems.reduce((sum, i) => sum + i.revenue, 0);
  const bRevenue = bItems.reduce((sum, i) => sum + i.revenue, 0);
  const cRevenue = cItems.reduce((sum, i) => sum + i.revenue, 0);
  const totalRevenue = aRevenue + bRevenue + cRevenue;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded p-4">
          <div className="text-sm text-green-800 font-medium">
            A პროდუქტები (მაღალი პრიორიტეტი)
          </div>
          <div className="text-2xl font-bold text-green-900">
            {aItems.length}
          </div>
          <div className="text-sm text-green-700">
            {totalRevenue > 0
              ? ((aRevenue / totalRevenue) * 100).toFixed(1)
              : 0}
            % შემოსავლის
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <div className="text-sm text-blue-800 font-medium">
            B ნივთები (საშუალო პრიორიტეტი)
          </div>
          <div className="text-2xl font-bold text-blue-900">
            {bItems.length}
          </div>
          <div className="text-sm text-blue-700">
            {totalRevenue > 0
              ? ((bRevenue / totalRevenue) * 100).toFixed(1)
              : 0}
            % შემოსავლის
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded p-4">
          <div className="text-sm text-gray-800 font-medium">
            C ნივთები (დაბალი პრიორიტეტი)
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {cItems.length}
          </div>
          <div className="text-sm text-gray-700">
            {totalRevenue > 0
              ? ((cRevenue / totalRevenue) * 100).toFixed(1)
              : 0}
            % შემოსავლის
          </div>
        </div>
      </div>

      {/* Detailed List */}
      <div className="space-y-4">
        {/* A Items */}
        <div>
          <h3 className="font-bold text-green-900 mb-2">
            🟢 A ნივთები - დიდი მარაგია საჭირო
          </h3>
          <div className="space-y-1">
            {aItems.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between bg-green-50 p-2 rounded"
              >
                <div>
                  <div className="font-medium">{item.productTitle}</div>
                  <div className="text-sm text-gray-600">
                    {item.unitsSold} ნივთ იყიდება @ საშუალოდ ₾
                    {item.averagePrice.toFixed(2)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">₾{item.revenue.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">
                    {item.revenuePercentage.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* B Items */}
        <div>
          <h3 className="font-bold text-blue-900 mb-2">
            🔵 B ნივთები - საშუალო მარაგია საჭირო
          </h3>
          <div className="space-y-1">
            {bItems.slice(0, 5).map((item) => (
              <div
                key={item.productId}
                className="flex justify-between bg-blue-50 p-2 rounded"
              >
                <div>
                  <div className="font-medium">{item.productTitle}</div>
                  <div className="text-sm text-gray-600">
                    {item.unitsSold} ცალი გაიყიდა
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">₾{item.revenue.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* C Items */}
        <div>
          <h3 className="font-bold text-gray-900 mb-2">
            ⚫ C ნივთები - მარაგის შემცირებაა საჭირო
          </h3>
          <div className="space-y-1">
            {cItems.slice(0, 5).map((item) => (
              <div
                key={item.productId}
                className="flex justify-between bg-gray-50 p-2 rounded"
              >
                <div>
                  <div className="font-medium">{item.productTitle}</div>
                  <div className="text-sm text-gray-600">
                    {item.unitsSold} ცალი გაიყიდა
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">₾{item.revenue.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
          {cItems.length > 5 && (
            <div className="text-sm text-gray-600 mt-2">
              + {cItems.length - 5} C ნივთი
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
