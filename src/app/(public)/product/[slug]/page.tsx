import Footer from "@/components/Footer";
import HeaderText from "@/components/HeaderCard";
import HeaderImage from "@/components/HeaderImage";
import ProductConsList from "@/components/ProductConsList";
import ProductDescription from "@/components/ProductDescription";
import ProductPictures from "@/components/ProductPictures";
import ProductPurchase from "@/components/ProductPurchase";
import ProductTitle from "@/components/ProductTitle";
import Rating from "@/components/Rating";
import Urgency from "@/components/Urgency";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug !== "pipe") notFound();

  return (
    <div className="flex flex-col gap-6 md:gap-10 w-full">
      {/* Header Text */}
      <HeaderText />
      {/*  Header Image */}
      <HeaderImage />
      {/* Urgency */}
      <Urgency />
      {/* Title */}
      <ProductTitle />
      {/* Ratings */}
      <Rating />
      {/* Product Cons List */}
      <ProductConsList />
      {/* Description */}
      <ProductDescription />
      {/* Options Chooser */}
      <ProductPurchase />
      {/* Product Images */}
      <ProductPictures />
      {/* Footer */}
      <Footer />
    </div>
  );
}
