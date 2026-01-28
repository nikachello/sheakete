"use client";
import { Dispatch, SetStateAction } from "react";
import { pipeOptions } from "@/lib/products";

const ProductOptions = ({
  selectedOption,
  setOption,
}: {
  selectedOption: number;
  setOption: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <>
      <h1 className="text-xl md:text-2xl font-bold mb-4">
        შეიძინე მეტი უფრო იაფად
      </h1>
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        {pipeOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => setOption(option.id)}
            className={`bg-[#F5F0EB] border rounded-xl p-4 md:p-6 flex flex-col justify-center items-center text-center cursor-pointer relative flex-1 ${
              selectedOption === option.id
                ? "border-red-500 shadow"
                : "border-[#D9CFC2]"
            }`}
          >
            {option.isPopular && (
              <div className="absolute -top-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                პოპულარული
              </div>
            )}

            <h3 className="font-bold text-[#8B5E3C]">{option.title}</h3>
            <p className="font-bold">{option.price} ლარი</p>
            <p className="text-xs">ცალში იხდით {option.pricePerUnit} ლარს</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductOptions;
