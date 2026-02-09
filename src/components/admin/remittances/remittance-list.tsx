"use client";

interface RemittanceListProps {
  remittances: Array<{
    id: string;
    totalAmount: number;
    bankReference: string | null;
    dateReceived: Date;
    createdAt: Date;
    _count?: {
      orders: number;
    };
  }>;
}

export function RemittanceList({ remittances }: RemittanceListProps) {
  return (
    <div className="space-y-3">
      {remittances.map((remittance) => (
        <div
          key={remittance.id}
          className="border rounded p-4 hover:bg-gray-50"
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="font-bold text-lg">
                ₾{remittance.totalAmount.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">
                {remittance._count?.orders || 0} orders
              </div>
              {remittance.bankReference && (
                <div className="text-xs text-gray-500 mt-1">
                  Ref: {remittance.bankReference}
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">
                {new Date(remittance.dateReceived).toLocaleDateString("ka-GE")}
              </div>
              <div className="text-xs text-gray-500">
                Created:{" "}
                {new Date(remittance.createdAt).toLocaleDateString("ka-GE")}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
