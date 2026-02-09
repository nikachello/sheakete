"use client";

interface CollectedOrdersListProps {
  orders: Array<{
    id: string;
    customerName: string;
    customerPhone: string;
    productTitle: string | null;
    actualPaidPrice: number | null;
    updatedAt: Date;
  }>;
}

export function CollectedOrdersList({ orders }: CollectedOrdersListProps) {
  return (
    <div className="space-y-2">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex justify-between items-center border-b pb-2"
        >
          <div>
            <div className="font-medium">{order.customerName}</div>
            <div className="text-sm text-gray-600">{order.productTitle}</div>
            <div className="text-xs text-gray-500">{order.customerPhone}</div>
          </div>
          <div className="text-right">
            <div className="font-bold">
              ₾{(order.actualPaidPrice || 0).toFixed(2)}
            </div>
            <div className="text-xs text-gray-500">
              {new Date(order.updatedAt).toLocaleDateString("ka-GE")}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
