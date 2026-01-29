"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { OrderStatus } from "generated/prisma/enums";

export type CreateLeadInput = {
  name: string;
  phone: string;
  productTitle: string;
  comboDetails?: string;
  price: number;
  notes?: string;
  isManual?: boolean; // If true, we can customize the TG message
};

export const createLead = async (formData: CreateLeadInput) => {
  try {
    // 1. Save to Database
    const newLead = await prisma.order.create({
      data: {
        customerName: formData.name,
        customerPhone: formData.phone,
        productTitle: formData.productTitle,
        comboDetails: formData.comboDetails,
        price: formData.price,
        notes: formData.notes,
        status: "PENDING",
        type: formData.isManual ? "ORDER" : "LEAD", // Manual entries usually start as Orders
      },
    });

    // 2. Notify Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const sourceEmoji = formData.isManual ? "📝 (Admin)" : "🌐 (Web)";
      const message =
        `<b>${sourceEmoji} ახალი შეკვეთა!</b>\n\n` +
        `<b>👤 სახელი:</b> ${formData.name}\n` +
        `<b>📞 ტელ:</b> ${formData.phone}\n` +
        `<b>📦 პროდუქტი:</b> ${formData.productTitle}\n` +
        `<b>🎁 შეთავაზება:</b> ${formData.comboDetails || "N/A"}\n` +
        `<b>💰 ფასი:</b> ${formData.price} GEL\n` +
        `<b>🛠 სტატუსი:</b> #Pending`;

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      });
    }

    revalidatePath("/admin/dashboard");
    return { success: true, data: newLead };
  } catch (err) {
    console.error("Lead Creation Error:", err);
    return { success: false, error: "შეკვეთა ვერ შეინახა" };
  }
};

export const updateOrderStatus = async (
  orderId: string,
  newStatus: OrderStatus
) => {
  try {
    // If status is CONFIRMED or PAID, automatically switch type to ORDER
    const isNowOrder = ["CONFIRMED", "PAID", "SHIPPED", "RECEIVED"].includes(
      newStatus
    );

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: newStatus,
        type: isNowOrder ? "ORDER" : "LEAD",
      },
    });

    revalidatePath("/admin/dashboard");
    return { success: true, updated };
  } catch (error) {
    return { success: false, error: "სტატუსი ვერ განახლდა" };
  }
};

export const getOrders = async () => {
  return await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });
};
