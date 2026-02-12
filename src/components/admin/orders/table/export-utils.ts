"use client";

import { Order } from "prisma/generated/prisma/client";

type EnrichedOrder = Order & {
  profit: number;
  revenue: number;
};

export function exportToCSV(
  orders: EnrichedOrder[],
  filename: string = "orders-export.csv"
) {
  // Define headers
  const headers = [
    "ID",
    "თარიღი",
    "დრო",
    "მომხმარებელი",
    "ტელეფონი",
    "პროდუქტი",
    "რაოდენობა",
    "ქალაქი",
    "მისამართი",
    "სტატუსი",
    "გადახდის სტატუსი",
    "ტიპი",
    "მოსალოდნელი ფასი",
    "შემოსავალი",
    "პროდუქტის ღირებულება",
    "მიწოდება",
    "დამატებითი ხარჯები",
    "მოგება",
    "მოგების %",
    "შენიშვნები",
  ];

  // Convert data to CSV rows
  const rows = orders.map((order) => {
    const date = new Date(order.createdAt);
    const margin =
      order.revenue > 0
        ? ((order.profit / order.revenue) * 100).toFixed(1)
        : "0";

    return [
      order.id,
      date.toLocaleDateString("ka-GE"),
      date.toLocaleTimeString("ka-GE"),
      order.customerName,
      order.customerPhone,
      order.productTitle || "",
      order.quantity,
      order.city || "",
      order.address || "",
      order.status,
      order.paymentStatus,
      order.type,
      order.expectedPrice.toFixed(2),
      order.revenue.toFixed(2),
      order.productCost.toFixed(2),
      order.shippingFee.toFixed(2),
      order.additionalCosts.toFixed(2),
      order.profit.toFixed(2),
      margin,
      order.notes || "",
    ];
  });

  // Create CSV content
  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    ),
  ].join("\n");

  // Add BOM for UTF-8 Excel compatibility
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  // Trigger download
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToJSON(
  orders: EnrichedOrder[],
  filename: string = "orders-export.json"
) {
  const jsonContent = JSON.stringify(orders, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json" });

  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function generateSummaryReport(orders: EnrichedOrder[]): string {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.revenue, 0);
  const totalProfit = orders.reduce((sum, o) => sum + o.profit, 0);
  const totalCosts = orders.reduce(
    (sum, o) => sum + o.productCost + o.shippingFee + o.additionalCosts,
    0
  );
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const profitMargin =
    totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

  // Group by status
  const statusBreakdown = orders.reduce(
    (acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Group by payment status
  const paymentBreakdown = orders.reduce(
    (acc, order) => {
      acc[order.paymentStatus] = (acc[order.paymentStatus] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Top cities
  const cityBreakdown = orders.reduce(
    (acc, order) => {
      if (order.city) {
        acc[order.city] = (acc[order.city] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  const topCities = Object.entries(cityBreakdown)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return `
შეკვეთების ანგარიში
გენერირებულია: ${new Date().toLocaleString("ka-GE")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ზოგადი სტატისტიკა
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

სულ შეკვეთები: ${totalOrders}
სულ შემოსავალი: ${totalRevenue.toFixed(2)} ₾
სულ მოგება: ${totalProfit.toFixed(2)} ₾
სულ ხარჯები: ${totalCosts.toFixed(2)} ₾
საშუალო შეკვეთა: ${averageOrderValue.toFixed(2)} ₾
მოგების მარჟა: ${profitMargin.toFixed(1)}%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
სტატუსის მიხედვით
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${Object.entries(statusBreakdown)
  .map(([status, count]) => `${status}: ${count}`)
  .join("\n")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
გადახდის სტატუსი
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${Object.entries(paymentBreakdown)
  .map(([status, count]) => `${status}: ${count}`)
  .join("\n")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ტოპ 5 ქალაქი
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${topCities.map(([city, count], index) => `${index + 1}. ${city}: ${count}`).join("\n")}
  `.trim();
}

export function printReport(orders: EnrichedOrder[]) {
  const report = generateSummaryReport(orders);
  const printWindow = window.open("", "_blank");

  if (printWindow) {
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>შეკვეთების ანგარიში</title>
          <style>
            body {
              font-family: 'Courier New', monospace;
              padding: 20px;
              white-space: pre-wrap;
            }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          ${report}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }
}
