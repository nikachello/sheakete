"use client";

import { useState } from "react";
import { createRemittance } from "@/actions/admin/remittances-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CreateRemittanceFormProps {
  collectedOrders: Array<{
    id: string;
    customerName: string;
    actualPaidPrice: number | null;
    productTitle: string | null;
  }>;
}

export function CreateRemittanceForm({
  collectedOrders,
}: CreateRemittanceFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [bankReference, setBankReference] = useState("");
  const [dateReceived, setDateReceived] = useState(
    new Date().toISOString().split("T")[0]
  );

  const totalAmount = collectedOrders
    .filter((o) => selectedOrders.includes(o.id))
    .reduce((sum, o) => sum + (o.actualPaidPrice || 0), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedOrders.length === 0) {
      alert("გთხოვთ აირჩიოთ მინიმუმ 1 შეკვეთა");
      return;
    }

    setLoading(true);

    const result = await createRemittance({
      orderIds: selectedOrders,
      bankReference: bankReference || undefined,
      dateReceived: new Date(dateReceived),
      notes: undefined,
    });

    setLoading(false);

    if (result.success) {
      setOpen(false);
      setSelectedOrders([]);
      setBankReference("");
      setDateReceived(new Date().toISOString().split("T")[0]);
    } else {
      alert(result.error);
    }
  };

  const toggleOrder = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const selectAll = () => {
    if (selectedOrders.length === collectedOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(collectedOrders.map((o) => o.id));
    }
  };

  if (collectedOrders.length === 0) {
    return <Button disabled>არ არსებობს ჩასარიცხი შეკვეთები</Button>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ გადარიცხვის შექმნა</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>ახალი გადარიცხვა</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">
                შეკვეთები ({collectedOrders.length})
              </label>
              <button
                type="button"
                onClick={selectAll}
                className="text-sm text-blue-600 hover:underline"
              >
                {selectedOrders.length === collectedOrders.length
                  ? "Deselect All"
                  : "Select All"}
              </button>
            </div>
            <div className="border rounded max-h-64 overflow-y-auto p-2 space-y-1">
              {collectedOrders.map((order) => (
                <label
                  key={order.id}
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => toggleOrder(order.id)}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{order.customerName}</div>
                    <div className="text-sm text-gray-600">
                      {order.productTitle}
                    </div>
                  </div>
                  <div className="font-bold">
                    ₾{(order.actualPaidPrice || 0).toFixed(2)}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Total Amount: <strong>₾{totalAmount.toFixed(2)}</strong>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              ბანკის რეფერენსი
            </label>
            <input
              type="text"
              value={bankReference}
              onChange={(e) => setBankReference(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="TRX-20260209-001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              მიღების თარიღი
            </label>
            <input
              type="date"
              value={dateReceived}
              onChange={(e) => setDateReceived(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              გაუქმება
            </Button>
            <Button
              type="submit"
              disabled={loading || selectedOrders.length === 0}
            >
              {loading ? "იქმნება..." : `შექმნა (₾${totalAmount.toFixed(2)})`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
