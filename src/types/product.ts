export type ProductOption = {
  id: number;
  title: string;
  price: number;
  pricePerUnit: number;
  isPopular?: boolean;
};

export type ComboOptions = {
  _key: string;
  isPopular: boolean;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
};

export interface Product {
  _id: string; // Sanity document ID
  _createdAt?: string;
  _updatedAt?: string;
  _rev?: string;
  title: string;
  slug: {
    _type: "slug";
    current: string;
  };
  cons?: string[]; // array of product pros
  description?: string;
  price: number;
  unit?: string;
  combos?: ComboItem[];
  image?: SanityImage;
  gallery?: GalleryImage[];
}

export interface ComboItem {
  quantity?: number;
  totalPrice?: number;
  unitPrice?: number;
  isPopular?: boolean;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface GalleryImage extends SanityImage {
  alt?: string;
}
