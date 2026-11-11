import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Package } from "lucide-react";
import { client } from "@/lib/sanity.client";

export const revalidate = 60;

interface CatalogProduct {
  _id: string;
  title: string;
  slug: string;
  price: number | null;
  unit: string | null;
  imageUrl: string | null;
}

const productsQuery = `
  *[_type == "product" && !(_id in path("drafts.**")) && defined(slug.current) && slug.current != ""]
  | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    price,
    unit,
    "imageUrl": image.asset->url
  }
`;

const currency = new Intl.NumberFormat("ka-GE", {
  style: "currency",
  currency: "GEL",
  maximumFractionDigits: 2,
});

export default async function Home() {
  const products = await client.fetch<CatalogProduct[]>(
    productsQuery,
    {},
    { next: { revalidate: 60 } },
  );

  return (
    <main lang="ka" className="min-h-screen bg-white px-4 py-8 text-zinc-950">
      <div className="mx-auto w-full max-w-md">
        <header className="mb-6">
          <p className="mb-2 text-sm text-zinc-500">შეაკეთე</p>
          <h1 className="text-2xl font-bold">პროდუქტები</h1>
        </header>

        {products.length === 0 ? (
          <p className="py-12 text-center text-sm text-zinc-500">
            პროდუქტები მალე დაემატება.
          </p>
        ) : (
          <ul className="divide-y divide-zinc-100">
            {products.map((product, index) => (
              <li key={product._id}>
                <Link
                  href={`/product/${encodeURIComponent(product.slug)}`}
                  className="group flex min-h-28 items-center gap-4 rounded-lg py-4 transition-colors hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900 active:bg-zinc-100"
                >
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-zinc-50">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        sizes="96px"
                        className="object-contain p-1"
                        priority={index < 3}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Package aria-hidden="true" className="size-8 text-zinc-300" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="break-words text-sm font-bold leading-6">
                      {product.title}
                    </h2>
                    {product.price !== null && (
                      <p className="mt-1 text-sm text-zinc-600">
                        {currency.format(product.price)}
                        {product.unit && (
                          <span className="text-zinc-400"> / {product.unit}</span>
                        )}
                      </p>
                    )}
                  </div>
                  <ChevronRight aria-hidden="true" className="size-5 shrink-0 text-zinc-400" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
