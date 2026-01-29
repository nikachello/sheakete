import { client } from "./sanity.client";

export async function getAdminProducts() {
  const query = `*[_type == "product"]{
    _id,
    title,
    unit,
    combos[]{
      _key,
      quantity,
      totalPrice
    }
  }`;
  return await client.fetch(query);
}

// Add the Supabase fetcher here as well to fix the 'getOrdersFromSupabase' error
export async function getOrdersFromSupabase() {
  // Replace with your actual Supabase fetch logic later
  // For now, returning an empty array to stop the error
  return [];
}
