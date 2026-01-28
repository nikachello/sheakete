import React from "react";

const HeaderCard = () => {
  return (
    <div className="font-georgian bg-[#3B2418] text-white p-5 md:p-16 rounded-2xl shadow-lg max-w-4xl w-full text-center mt-5">
      <h1 className="text-3xl md:text-5xl font-bold leading-snug mb-4">
        დიდი ფასდაკლება
      </h1>
      <p className="font-georgian text-lg md:text-2xl mb-6">
        შეუკვეთეთ და მიიღეთ პროდუქცია მეორე დღეს განსაკუთრებული ფასდაკლებით!
      </p>
      <button className="bg-white text-[#8B5E3C] font-bold px-8 py-3 rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer">
        შეუკვეთეთ ახლავე
      </button>
    </div>
  );
};

export default HeaderCard;
