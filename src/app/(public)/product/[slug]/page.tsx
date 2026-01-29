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
import { isEmpty } from "@/lib/helpers";
import { client } from "@/lib/sanity.client";
import { notFound } from "next/navigation";

const query = `
  *[_type == "product" && slug.current == $slug][0]{
    title,
    description,
    price,
    cons,
    unit,
    combos,
    "imageUrl": image.asset->url,
    "gallery": gallery[]{
      "url": asset->url,
      alt
    }
  }
`;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await client.fetch(query, {
    slug,
  });

  if (isEmpty(product)) return <div>არ მოიძებნა პროდუქტი</div>;

  return (
    <div className="flex flex-col gap-6 md:gap-10 w-full">
      {/* Header Text */}
      <HeaderText />
      {/*  Header Image */}
      <HeaderImage imageUrl={product.imageUrl} />
      {/* Urgency */}
      <Urgency />
      {/* Title */}
      <ProductTitle title={product.title} />
      {/* Ratings */}
      <Rating />
      {/* Product Cons List */}
      <ProductConsList cons={product.cons} />
      {/* Description */}
      <ProductDescription description={product.description} />
      {/* Options Chooser */}
      <ProductPurchase comboOptions={product.combos} unit={product.unit} />
      {/* Product Images */}
      <ProductPictures images={product.gallery} />
      {/* Footer */}
      <Footer />
    </div>
  );
}
