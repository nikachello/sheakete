export interface StockAlert {
  productId: string;
  productTitle: string;
  quantityOnHand: number;
  quantityReserved: number;
  quantityAvailable: number;
  reorderPoint: number | null;
  dailySalesVelocity: number;
  daysUntilStockout: number;
  severity: "CRITICAL" | "WARNING" | "INFO";
}
