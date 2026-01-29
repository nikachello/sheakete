import Image from "next/image";

export default function HeaderImage({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-full">
      <Image
        src={imageUrl}
        width={1000}
        height={400}
        alt="header-1"
        className="rounded-2xl w-full h-auto"
      />
    </div>
  );
}
