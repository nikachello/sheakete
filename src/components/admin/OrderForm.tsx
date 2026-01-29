"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, PlusCircle } from "lucide-react";
import { Label } from "../ui/label";
import { createLead } from "@/lib/actions";

interface Product {
  _id: string;
  title: string;
  unit: string;
  combos: { _key: string; quantity: number; totalPrice: number }[];
}

export default function OrderForm({ products }: { products: Product[] }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    productId: "",
    comboKey: "",
  });

  const selectedProduct = products.find((p) => p._id === formData.productId);
  const selectedCombo = selectedProduct?.combos.find(
    (c) => c._key === formData.comboKey
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !selectedCombo) return;
    setLoading(true);

    const res = await createLead({
      name: formData.name,
      phone: formData.phone,
      productTitle: selectedProduct.title,
      comboDetails: `${selectedCombo.quantity} ${selectedProduct.unit}`,
      price: selectedCombo.totalPrice,
    });

    if (res.success) {
      setFormData({ name: "", phone: "", productId: "", comboKey: "" });
    } else {
      alert(res.error);
    }
    setLoading(false);
  };

  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <PlusCircle size={20} className="text-blue-600" />
          ახალი შეკვეთა
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>სახელი და გვარი</Label>
            <Input
              placeholder="გიორგი გიორგაძე"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label>ტელეფონი</Label>
            <Input
              type="tel"
              placeholder="599 00 00 00"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label>პროდუქტი</Label>
            <Select
              onValueChange={(val) =>
                setFormData({ ...formData, productId: val, comboKey: "" })
              }
              value={formData.productId}
            >
              <SelectTrigger>
                <SelectValue placeholder="აირჩიეთ პროდუქტი" />
              </SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={p._id} value={p._id}>
                    {p.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>რაოდენობა / ფასი</Label>
            <Select
              disabled={!formData.productId}
              onValueChange={(val) =>
                setFormData({ ...formData, comboKey: val })
              }
              value={formData.comboKey}
            >
              <SelectTrigger>
                <SelectValue placeholder="აირჩიეთ კომბო" />
              </SelectTrigger>
              <SelectContent>
                {selectedProduct?.combos.map((c) => (
                  <SelectItem key={c._key} value={c._key}>
                    {c.quantity} {selectedProduct.unit} - {c.totalPrice} ლარი
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "შეკვეთის შენახვა"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
