// components/stocks/add-stock-dialog.tsx
"use client";

import { useState, useEffect, useRef } from "react";
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
import { getProducts } from "@/actions/admin/products-actions";
import { addStockAction } from "@/actions/admin/stock-actions";
import { ScrollArea } from "@/components/ui/scroll-area";

type Product = {
  _id: string;
  title: string;
  price: number;
  unit?: string;
};

type StockType = "PURCHASE" | "ADJUSTMENT";

export function AddStockDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>(""); // Changed to string for controlled Select
  const [type, setType] = useState<StockType>("PURCHASE");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (open) {
      getProducts().then(setProducts);
    }
  }, [open]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setSelectedProduct("");
      setType("PURCHASE");
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedProduct) return;

    const product = products.find((p) => p._id === selectedProduct);
    if (!product) return;

    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const quantity = Number(formData.get("quantity"));
    const unitCost = formData.get("unitCost")
      ? Number(formData.get("unitCost"))
      : undefined;

    try {
      const result = await addStockAction({
        productId: product._id,
        productTitle: product.title,
        quantity,
        type,
        unitCost: type === "PURCHASE" ? unitCost : undefined,
        notes: (formData.get("notes") as string) || undefined,
      });

      if (!result.success) {
        alert(result.error || "მარაგის დამატება ვერ მოხერხდა");
        return;
      }

      // Success - reset form and close
      if (formRef.current) {
        formRef.current.reset();
      }
      setSelectedProduct("");
      setType("PURCHASE");
      setOpen(false);
    } catch (error) {
      console.error(error);
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

      <DialogContent className="max-w-md max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>მარაგის ოპერაცია</DialogTitle>
          <DialogDescription>შესყიდვა ან ხელით კორექცია</DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 overflow-y-auto pr-4 -mr-4">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-4"
            id="stock-form"
          >
            {/* PRODUCT */}
            <div className="space-y-2">
              <Label>პროდუქტი *</Label>
              <Select
                value={selectedProduct}
                onValueChange={setSelectedProduct}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="აირჩიეთ პროდუქტი" />
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="max-h-[200px]">
                    {products.map((p) => (
                      <SelectItem key={p._id} value={p._id}>
                        <span className="block truncate max-w-[300px]">
                          {p.title}
                        </span>
                      </SelectItem>
                    ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>

            {/* TYPE */}
            <div className="space-y-2">
              <Label>ტიპი *</Label>
              <Select
                value={type}
                onValueChange={(v) => setType(v as StockType)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PURCHASE">
                    შესყიდვა (ახალი მარაგი)
                  </SelectItem>
                  <SelectItem value="ADJUSTMENT">კორექცია (+ / -)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* QUANTITY */}
            <div className="space-y-2">
              <Label>
                რაოდენობა *
                {type === "ADJUSTMENT" && (
                  <span className="text-xs text-muted-foreground ml-2">
                    (შეიძლება იყოს უარყოფითი)
                  </span>
                )}
              </Label>
              <Input
                name="quantity"
                type="number"
                required
                step="1"
                min={type === "PURCHASE" ? 1 : undefined}
                placeholder={type === "ADJUSTMENT" ? "-5 ან 10" : "10"}
                className="w-full"
              />
            </div>

            {/* UNIT COST (PURCHASE ONLY) */}
            {type === "PURCHASE" && (
              <div className="space-y-2">
                <Label>ერთეულის ფასი *</Label>
                <Input
                  name="unitCost"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  placeholder="მაგ: 12.50"
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  გამოიყენება საშუალო თვითღირებულების დასათვლელად
                </p>
              </div>
            )}

            {/* NOTES */}
            <div className="space-y-2">
              <Label>შენიშვნა</Label>
              <Textarea
                name="notes"
                rows={3}
                placeholder="..."
                className="w-full resize-none"
              />
            </div>
          </form>
        </ScrollArea>

        <DialogFooter className="flex-shrink-0 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            გაუქმება
          </Button>
          <Button
            type="submit"
            form="stock-form"
            disabled={loading || !selectedProduct}
          >
            {loading ? "მიმდინარეობს..." : "შენახვა"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
