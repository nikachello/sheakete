"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Plus } from "lucide-react";
import { createOrder } from "@/actions/admin/order-actions";
import { getProducts } from "@/actions/admin/products-actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Product = {
  _id: string;
  title: string;
  price: number;
  unit?: string;
  combos?: Array<{
    quantity: number;
    totalPrice: number;
    unitPrice?: number;
    isPopular?: boolean;
  }>;
};

export function AddOrderDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCombo, setSelectedCombo] = useState<string>("");
  const [expectedPrice, setExpectedPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("1"); // Add this

  useEffect(() => {
    if (open) {
      getProducts().then(setProducts);
    }
  }, [open]);

  function handleProductChange(productId: string) {
    const product = products.find((p) => p._id === productId);
    setSelectedProduct(product || null);
    setSelectedCombo("");
    setExpectedPrice("");
    setQuantity("1"); // Reset quantity
  }

  function handleComboChange(comboIndex: string) {
    setSelectedCombo(comboIndex);

    if (selectedProduct && comboIndex) {
      const combo = selectedProduct.combos?.[parseInt(comboIndex)];
      if (combo) {
        setExpectedPrice(combo.totalPrice.toString());
        setQuantity(combo.quantity.toString()); // Auto-fill quantity from combo
      }
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // Get combo details if selected
    let comboDetails = "";

    if (selectedProduct && selectedCombo) {
      const combo = selectedProduct.combos?.[parseInt(selectedCombo)];
      if (combo) {
        comboDetails = `${combo.quantity} ${selectedProduct.unit || "ცალი"}`;
      }
    }

    const data = {
      customerName: formData.get("customerName") as string,
      customerPhone: formData.get("customerPhone") as string,
      city: formData.get("city") as string,
      address: formData.get("address") as string,
      productId: selectedProduct?._id || null,
      productTitle: selectedProduct?.title || "",
      comboDetails: comboDetails || (formData.get("comboDetails") as string),
      quantity: parseInt(quantity) || 1, // Use state value
      expectedPrice: parseFloat(expectedPrice) || 0, // Use state value
      productCost: parseFloat(formData.get("productCost") as string) || 0,
      shippingFee: parseFloat(formData.get("shippingFee") as string) || 0,
      additionalCosts:
        parseFloat(formData.get("additionalCosts") as string) || 0,
      notes: formData.get("notes") as string,
    };

    try {
      await createOrder(data);
      setOpen(false);
      e.currentTarget.reset();
      setSelectedProduct(null);
      setSelectedCombo("");
      setExpectedPrice("");
      setQuantity("1"); // Reset
    } catch (error) {
      console.error("Failed to create order:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          ახალი შეკვეთა
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>ახალი შეკვეთის დამატება</DialogTitle>
          <DialogDescription>შეავსეთ შეკვეთის დეტალები</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Customer Information */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerName" className="text-right">
                მომხმარებელი *
              </Label>
              <Input
                id="customerName"
                name="customerName"
                placeholder="სახელი გვარი"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerPhone" className="text-right">
                ტელეფონი *
              </Label>
              <Input
                id="customerPhone"
                name="customerPhone"
                placeholder="5XX XX XX XX"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                ქალაქი
              </Label>
              <Input
                id="city"
                name="city"
                placeholder="თბილისი"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                მისამართი
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="ზუსტი მისამართი"
                className="col-span-3"
              />
            </div>

            <div className="border-t pt-4" />

            {/* Product Selection */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="product" className="text-right">
                პროდუქტი *
              </Label>
              <Select onValueChange={handleProductChange} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="აირჩიეთ პროდუქტი" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product._id} value={product._id}>
                      {product.title} - {product.price} ₾
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Combo Selection */}
            {selectedProduct &&
              selectedProduct.combos &&
              selectedProduct.combos.length > 0 && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="combo" className="text-right">
                    შეთავაზება
                  </Label>
                  <Select
                    onValueChange={handleComboChange}
                    value={selectedCombo}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="აირჩიეთ შეთავაზება" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedProduct.combos.map((combo, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          {combo.quantity} {selectedProduct.unit || "ცალი"} -{" "}
                          {combo.totalPrice} ₾
                          {combo.isPopular && " (პოპულარული)"}
                          {combo.unitPrice && ` • ${combo.unitPrice}₾/ცალი`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

            {/* Manual combo details if no combo selected */}
            {selectedProduct &&
              (!selectedProduct.combos ||
                selectedProduct.combos.length === 0 ||
                !selectedCombo) && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="comboDetails" className="text-right">
                    კომბო დეტალები
                  </Label>
                  <Input
                    id="comboDetails"
                    name="comboDetails"
                    placeholder="ზომა, ფერი, რაოდენობა"
                    className="col-span-3"
                  />
                </div>
              )}

            {/* Quantity - Now controlled */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                რაოდენობა
              </Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min={1}
                className="col-span-3"
              />
            </div>

            <div className="border-t pt-4" />

            {/* Pricing Information */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expectedPrice" className="text-right">
                მოსალოდნელი ფასი *
              </Label>
              <Input
                id="expectedPrice"
                name="expectedPrice"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="col-span-3"
                value={expectedPrice}
                onChange={(e) => setExpectedPrice(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="productCost" className="text-right">
                პროდუქტის ღირებულება
              </Label>
              <Input
                id="productCost"
                name="productCost"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shippingFee" className="text-right">
                მიწოდების საფასური
              </Label>
              <Input
                id="shippingFee"
                name="shippingFee"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="additionalCosts" className="text-right">
                დამატებითი ხარჯები
              </Label>
              <Input
                id="additionalCosts"
                name="additionalCosts"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="col-span-3"
              />
            </div>

            <div className="border-t pt-4" />

            {/* Notes */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="notes" className="text-right pt-2">
                შენიშვნები
              </Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="დამატებითი ინფორმაცია..."
                className="col-span-3"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              გაუქმება
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "მიმდინარეობს..." : "დამატება"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
