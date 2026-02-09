"use client";

interface ExpenseChartProps {
  data: Array<{
    month: string;
    total: number;
    marketing: number;
    operating: number;
  }>;
}

export function ExpenseChart({ data }: ExpenseChartProps) {
  const maxValue = Math.max(...data.map((d) => d.total));

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index}>
          <div className="flex justify-between text-sm mb-1">
            <span>{item.month}</span>
            <span className="font-bold">₾{item.total.toFixed(2)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
            <div className="h-full flex">
              <div
                className="bg-blue-600 h-full"
                style={{ width: `${(item.marketing / maxValue) * 100}%` }}
                title={`მარკეტინგი: ₾${item.marketing.toFixed(2)}`}
              />
              <div
                className="bg-green-600 h-full"
                style={{ width: `${(item.operating / maxValue) * 100}%` }}
                title={`ოპერაციები: ₾${item.operating.toFixed(2)}`}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>მარკეტინგი: ₾{item.marketing.toFixed(2)}</span>
            <span>ოპერაციები: ₾{item.operating.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
