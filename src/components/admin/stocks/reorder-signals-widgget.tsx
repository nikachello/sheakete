import { ReorderSignal } from "@/services/inventory/velocity.service";

// components/inventory/reorder-signals-widget.tsx
export function ReorderSignalsWidget({
  signals,
}: {
  signals: ReorderSignal[];
}) {
  if (signals.length === 0) return null;

  const urgencyColor = {
    immediate: "bg-red-100 text-red-800",
    soon: "bg-orange-100 text-orange-800",
    monitor: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div className="card">
      <h3>Reorder Signals</h3>
      {signals.map((s) => (
        <div
          key={s.productId}
          className="flex items-center justify-between p-3 border-b"
        >
          <div>
            <span className={`badge`}>{s.urgency}</span>
            <p className="font-medium">{s.productTitle}</p>
            <p className="text-sm text-gray-500">{s.reason}</p>
          </div>
          <div className="text-right">
            <p className="text-sm">Reorder: {s.recommendedQuantity} units</p>
            <p className="text-sm">via {s.recommendedShippingMode}</p>
            <p className="font-medium">{s.estimatedTotalCost.toFixed(2)} GEL</p>
          </div>
          {/* Link to create inventory order with pre-filled data */}
          <a
            href={`/inventory/orders/new?productId=${s.productId}&qty=${s.recommendedQuantity}&mode=${s.recommendedShippingMode}`}
          >
            Order Now →
          </a>
        </div>
      ))}
    </div>
  );
}
