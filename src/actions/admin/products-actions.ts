import { client } from "@/lib/sanity.client";

export async function getProducts() {
  return client.fetch(
    `*[_type == "product"] | order(title asc) {
      _id,
      title,
      price,
      unit,
      combos[] {
        quantity,
        totalPrice,
        unitPrice,
        isPopular
      }
    }`
  );
}
