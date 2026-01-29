"use client";
import { useState } from "react";
import ProductOptions from "./ProductOptions";
import { pipeOptions } from "@/lib/products";
import CountdownTimer from "./CountdownTimer";
import { ComboOptions } from "@/lib/types";

const ProductPurchase = ({
  comboOptions,
  unit,
}: {
  comboOptions: ComboOptions[];
  unit: string;
}) => {
  const [selectedOptionKey, setSelectedOptionKey] = useState(
    comboOptions?.find((opt) => opt.isPopular)?._key || comboOptions?.[0]?._key
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const currentOption = comboOptions?.find(
    (option) => option._key === selectedOptionKey
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  console.log(comboOptions);

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
        <div className="mt-4">
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
