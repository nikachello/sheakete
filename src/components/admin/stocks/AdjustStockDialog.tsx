// components/stocks/adjust-stock-dialog.tsx
"use client";

import { useState } from "react";
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
import { Settings } from "lucide-react";
import { adjustStock } from "@/actions/admin/stock-actions";

type Props = {
  productId: string;
  productTitle: string;
  currentQuantity: number;
};

export function AdjustStockDialog({
  productId,
  productTitle,
  currentQuantity,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      await adjustStock({
        productId,
        productTitle,
        newQuantity: parseInt(formData.get("newQuantity") as string),
        notes: formData.get("notes") as string,
      });

      setOpen(false);
    } catch (error) {
      console.error("Failed to adjust stock:", error);
      alert("კორექცია ვერ მოხერხდა");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>მარაგის კორექცია</DialogTitle>
          <DialogDescription className="break-words">
            {productTitle}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>მიმდინარე რაოდენობა</Label>
              <p className="text-2xl font-bold">{currentQuantity}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newQuantity">ახალი რაოდენობა *</Label>
              <Input
                id="newQuantity"
                name="newQuantity"
                type="number"
                defaultValue={currentQuantity}
                required
                min="0"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">მიზეზი *</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="მაგ: ინვენტარიზაცია, დაზიანება..."
                rows={3}
                required
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
            <Button type="submit" disabled={loading}>
              {loading ? "მიმდინარეობს..." : "შენახვა"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
