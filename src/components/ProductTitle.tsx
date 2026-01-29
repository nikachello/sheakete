import React from "react";

const ProductTitle = ({ title }: { title: string }) => {
  return (
    <div>
      <h2 className="font-bold text-2xl">
        {/* 20/25 მმ-იანი PPR/PVC მილების ხრახნის გამომჭრელი თავები 2 ცალიანი
        კომპლექტი */}
        {title}
      </h2>
    </div>
  );
};

export default ProductTitle;
