"use server";
import { prisma } from "@/lib/prisma";
import { CreateLeadInput } from "@/types/leads";
import { revalidatePath } from "next/cache";

export const createLead = async (formData: CreateLeadInput) => {
  try {
    // 1. Save to Database
    const newLead = await prisma.order.create({
      data: {
        customerName: formData.name,
        customerPhone: formData.phone,
        productTitle: formData.productTitle,
        comboDetails: formData.comboDetails,
        notes: formData.notes,
        status: "PENDING",
        expectedPrice: formData.price,
      },
    });

    // 2. Notify Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const message =
        `<b> ახალი შეკვეთა!</b>\n\n` +
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
