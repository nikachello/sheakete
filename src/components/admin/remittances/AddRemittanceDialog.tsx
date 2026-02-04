// components/remittances/add-remittance-dialog.tsx
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
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import {
  createRemittance,
  getCollectedOrders,
} from "@/actions/admin/remittances-actions";
import { format } from "date-fns";

type CollectedOrder = {
  id: string;
  customerName: string;
  customerPhone: string;
  productTitle: string | null;
  comboDetails: string | null;
  actualPaidPrice: number | null;
  cashCollected: number | null;
  updatedAt: Date;
};

export function AddRemittanceDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<CollectedOrder[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (open) {
      getCollectedOrders().then(setOrders);
    } else {
      // Reset when dialog closes
      setSelectedOrders(new Set());
    }
  }, [open]);

  const toggleOrder = (orderId: string) => {
    setSelectedOrders((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(orderId)) {
        newSelected.delete(orderId);
      } else {
        newSelected.add(orderId);
      }
      return newSelected;
    });
  };

  const selectAll = () => {
    setSelectedOrders(new Set(orders.map((o) => o.id)));
  };

  const clearAll = () => {
    setSelectedOrders(new Set());
  };

  const totalAmount = orders
    .filter((o) => selectedOrders.has(o.id))
    .reduce((sum, o) => sum + (o.actualPaidPrice || 0), 0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      await createRemittance({
        orderIds: Array.from(selectedOrders),
        bankReference: formData.get("bankReference") as string,
        dateReceived: new Date(formData.get("dateReceived") as string),
        notes: formData.get("notes") as string,
      });

      setOpen(false);
      setSelectedOrders(new Set());
    } catch (error) {
      console.error("Failed to create remittance:", error);
      alert("გადარიცხვის შექმნა ვერ მოხერხდა");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          ახალი გადარიცხვა
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>ახალი გადარიცხვის დამატება</DialogTitle>
          <DialogDescription>
            აირჩიეთ შეკვეთები რომელთა თანხებიც მიიღეთ
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Date and Reference */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateReceived">მიღების თარიღი *</Label>
                <Input
                  id="dateReceived"
                  name="dateReceived"
                  type="date"
                  defaultValue={format(new Date(), "yyyy-MM-dd")}
                  required
                />
              </div>
              <div>
                <Label htmlFor="bankReference">საბანკო რეფერენსი</Label>
                <Input
                  id="bankReference"
                  name="bankReference"
                  placeholder="REF-12345"
                />
              </div>
            </div>

            {/* Order Selection */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <Label className="text-base font-semibold">
                  შეკვეთები ({selectedOrders.size} / {orders.length})
                </Label>
                <div className="space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={selectAll}
                  >
                    ყველას არჩევა
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={clearAll}
                  >
                    გასუფთავება
                  </Button>
                </div>
              </div>

              {orders.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  არ არის ასაღები შეკვეთები
                </p>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {orders.map((order) => (
                    <label
                      key={order.id}
                      className="flex items-center space-x-3 p-3 border rounded hover:bg-accent cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedOrders.has(order.id)}
                        onCheckedChange={() => toggleOrder(order.id)}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">
                          {order.customerName}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {order.productTitle}{" "}
                          {order.comboDetails && `• ${order.comboDetails}`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(order.updatedAt), "dd/MM/yyyy")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {order.actualPaidPrice?.toFixed(2)} ₾
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Total Amount */}
            <div className="flex justify-between items-center p-4 bg-accent rounded-lg">
              <span className="font-semibold text-lg">ჯამური თანხა:</span>
              <span className="font-bold text-2xl">
                {totalAmount.toFixed(2)} ₾
              </span>
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes">შენიშვნები</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="დამატებითი ინფორმაცია..."
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
            <Button
              type="submit"
              disabled={loading || selectedOrders.size === 0}
            >
              {loading ? "მიმდინარეობს..." : "დამატება"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
