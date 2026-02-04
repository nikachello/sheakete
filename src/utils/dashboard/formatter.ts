import { OrderStatus } from "prisma/generated/prisma/client";

export function activityMessageFromOrder(order: {
  id: string;
  status: OrderStatus;
  actualPaidPrice: number | null;
  customerName: string;
  comboDetails: string | null;
  productTitle: string | null;
}) {
  switch (order.status) {
    case "DELIVERED":
      return `შეკვეთა ${order.customerName} - ${order.productTitle} - ${order.comboDetails} მიტანილია - ${order.actualPaidPrice ?? 0} ლარი`;
    case "RETURNED":
      return `შეკვეთა ${order.customerName} - ${order.productTitle} - ${order.comboDetails} დაბრუნდა`;
    case "SHIPPED":
      return `შეკვეთა ${order.customerName} - ${order.productTitle} - ${order.comboDetails} გაიგზავნა`;
    default:
      return `შეკვეთა ${order.customerName} - ${order.productTitle} - ${order.comboDetails} განახლდა`;
  }
}
