import Image from "next/image";

export default function HeaderImage() {
  return (
    <div className="w-full">
      <Image
        src="/images/header-1.png"
        width={1000}
        height={400}
        alt="header-1"
        className="rounded-2xl w-full h-auto"
      />
    </div>
  );
}
