"use client";
import { useState } from "react";
import ProductOptions from "./ProductOptions";
import CountdownTimer from "./CountdownTimer";
import { ComboOptions } from "@/types/product";
import { createLead } from "@/actions/public/leads-actions";

const ProductPurchase = ({
  comboOptions,
  unit,
  productTitle,
}: {
  comboOptions: ComboOptions[];
  unit: string;
  productTitle: string;
}) => {
  const [selectedOptionKey, setSelectedOptionKey] = useState(
    comboOptions?.find((opt) => opt.isPopular)?._key || comboOptions?.[0]?._key
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const currentOption = comboOptions?.find(
    (option) => option._key === selectedOptionKey
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    const message = `
🚀 **ახალი შეკვეთა!**
━━━━━━━━━━━━━━━━
📦 **პროდუქტი:** ${productTitle}
👤 **სახელი:** ${name}
📞 **ტელეფონი:** \`${phone}\`
━━━━━━━━━━━━━━━━
🎁 **არჩევანი:** ${currentOption?.quantity} ${unit}
💰 **ჯამური ფასი:** ${currentOption?.totalPrice} ლარი
━━━━━━━━━━━━━━━━
📅 ${new Date().toLocaleString("ka-GE")}
    `;

    try {
      // const res = await fetch("/api/telegram", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ message }),
      // });
      const res = await createLead({
        name,
        phone,
        productTitle,
        comboDetails: `${currentOption?.quantity} ${unit}`, // Format combo info
        price: currentOption?.totalPrice || 0,
      });

      if (res.success) {
        setIsSuccess(true);
        setName("");
        setPhone("");
      } else {
        alert("ვერ გაიგზავნა. სცადეთ მოგვიანებით.");
      }
    } catch (err) {
      alert("დაფიქსირდა შეცდომა.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-8 text-center flex flex-col items-center gap-4">
        <div className="text-5xl">✅</div>
        <h2 className="text-2xl font-bold text-green-700">
          შეკვეთა მიღებულია!
        </h2>
        <p className="text-green-600">ჩვენი მენეჯერი მალე დაგიკავშირდებათ.</p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-sm underline text-green-800 mt-4"
        >
          ახალი შეკვეთა
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <ProductOptions
        selectedOption={selectedOptionKey}
        setOption={setSelectedOptionKey}
        options={comboOptions}
        unit={unit}
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 items-start sm:items-center">
          <p className="text-xl md:text-2xl font-bold text-red-500">
            {currentOption?.quantity} {unit} - {currentOption?.totalPrice} ლარი
          </p>
          <p className="bg-sky-600 text-xs p-2 rounded-full text-white whitespace-nowrap">
            50% ფასდაკლება
          </p>
        </div>
        <p className="text-xs">✅მარაგშია</p>
        <CountdownTimer />
        <div className="mt-4 scroll-mt-15">
          <p className="text-xl md:text-2xl font-bold mb-4">
            შესაძენად შეავსე განაცხადი:
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="სახელი და გვარი"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
            />
            <input
              type="tel"
              placeholder="ტელეფონის ნომერი"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
            />
            <button
              type="submit"
              className="w-full bg-[#8B5E3C] text-white font-bold px-8 py-4 rounded-full shadow-md hover:bg-[#6d4a2e] transition"
            >
              გაგზავნა
            </button>
          </form>
        </div>
        <div className="text-center bg-yellow-100 rounded-2xl p-2">
          <p className="font-bold">ჩვენ გიბრუნებთ თანხას</p>
          <p>
            ნებისმიერი პრობლემის შემთხვევაში ჩვენ დაგიბრუნებთ თანხას 14 დღის
            მანძილზე
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPurchase;
