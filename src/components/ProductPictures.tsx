import Image from "next/image";
import React from "react";

const ProductPictures = () => {
  return (
    <div className="mt-2 flex flex-col gap-2">
      <Image
        src={"/images/product-1.jpg"}
        alt="image-1"
        width={1000}
        height={400}
        className="shadow-lg"
      />
      <Image
        src={"/images/product-2.jpg"}
        alt="image-1"
        width={1000}
        height={400}
        className="shadow-lg"
      />
      <Image
        src={"/images/product-3.jpg"}
        alt="image-1"
        width={1000}
        height={400}
        className="shadow-lg"
      />
      <Image
        src={"/images/product-4.jpg"}
        alt="image-1"
        width={1000}
        height={400}
        className="shadow-lg"
      />
    </div>
  );
};

export default ProductPictures;
