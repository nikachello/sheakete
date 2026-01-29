import Image from "next/image";

interface Props {
  images: { url: string; alt?: string }[];
}

const ProductPictures = ({ images }: Props) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 w-full">
      {images.map((image, index) => (
        <div key={index}>
          <Image
            src={image.url}
            alt={image.alt || "Product image"}
            width={1000}
            height={400}
            className="object-contain rounded-xl shadow-xl"
          />
        </div>
      ))}
    </div>
  );
};

export default ProductPictures;
