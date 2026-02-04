// components/stocks/add-stock-dialog.tsx
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { addStock } from "@/actions/admin/stock-actions";
import { getProducts } from "@/actions/admin/products-actions";
import { StockMovementType } from "prisma/generated/prisma/client";

type Product = {
  _id: string;
  title: string;
  price: number;
  unit?: string;
};

export function AddStockDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (open) {
      getProducts().then(setProducts);
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedProduct) return;

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      await addStock({
        productId: selectedProduct._id,
        productTitle: selectedProduct.title,
        quantity: parseInt(formData.get("quantity") as string),
        type: formData.get("type") as StockMovementType,
        notes: formData.get("notes") as string,
      });

      setOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Failed to add stock:", error);
      alert("მარაგის დამატება ვერ მოხერხდა");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          მარაგის დამატება
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>მარაგის დამატება</DialogTitle>
          <DialogDescription>
            აირჩიეთ პროდუქტი და მიუთითეთ რაოდენობა
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="product">პროდუქტი *</Label>
              <Select
                onValueChange={(value) => {
                  const product = products.find((p) => p._id === value);
                  setSelectedProduct(product || null);
                }}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="აირჩიეთ პროდუქტი" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem
                      key={product._id}
                      value={product._id}
                      className="max-w-full"
                    >
                      <span className="block truncate max-w-[350px]">
                        {product.title}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedProduct && (
                <p className="text-sm text-muted-foreground break-words">
                  {selectedProduct.title}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">ტიპი *</Label>
              <Select
                name="type"
                defaultValue={StockMovementType.PURCHASE}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={StockMovementType.PURCHASE}>
                    შესყიდვა
                  </SelectItem>
                  <SelectItem value={StockMovementType.ADJUSTMENT}>
                    კორექცია
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">რაოდენობა *</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                placeholder="0"
                required
                min="1"
                className="w-full"
              />
              {selectedProduct?.unit && (
                <p className="text-xs text-muted-foreground">
                  ერთეული: {selectedProduct.unit}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">შენიშვნები</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="დამატებითი ინფორმაცია..."
                rows={3}
                className="w-full resize-none"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              გაუქმება
            </Button>
            <Button type="submit" disabled={loading || !selectedProduct}>
              {loading ? "მიმდინარეობს..." : "დამატება"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
