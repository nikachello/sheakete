"use client";
import { ComboOptions } from "@/types/product";
import { Dispatch, SetStateAction } from "react";
// import { pipeOptions } from "@/lib/products";
// import { ComboOptions } from "@/lib/types";

const ProductOptions = ({
  selectedOption,
  setOption,
  options,
  unit,
}: {
  selectedOption: string;
  setOption: Dispatch<SetStateAction<string>>;
  options: ComboOptions[];
  unit: string;
}) => {
  console.log("from options:", options);
  return (
    <div id="purchase-form">
      <h1 className="text-xl md:text-2xl font-bold mb-4">
        შეიძინე მეტი უფრო იაფად
      </h1>
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        {options.map((option) => (
          <div
            key={option._key}
            onClick={() => setOption(option._key)}
            className={`bg-[#F5F0EB] border rounded-xl p-4 md:p-6 flex flex-col justify-center items-center text-center cursor-pointer relative flex-1 ${
              selectedOption === option._key
                ? "border-red-500 shadow"
                : "border-[#D9CFC2]"
            }`}
          >
            {option.isPopular && (
              <div className="absolute -top-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                პოპულარული
              </div>
            )}

            <h3 className="font-bold text-[#8B5E3C]">
              {option.quantity} {unit}
            </h3>
            <p className="font-bold">{option.totalPrice} ლარი</p>
            <p className="text-xs">ცალში იხდით {option.unitPrice} ლარს</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductOptions;
