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
