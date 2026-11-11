"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExpenseType } from "@prisma-client";
import { createExpense } from "@/actions/admin/expenses-actions";

type ExpenseFormState = {
  type: ExpenseType;
  amount: string;
  description: string;
  reference: string;
  payer: "company" | "founder";
};

export function ExpenseForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ExpenseFormState>({
    type: ExpenseType.OTHER,
    amount: "",
    description: "",
    reference: "",
    payer: "company" as "company" | "founder",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const now = new Date();
    const result = await createExpense({
      type: formData.type,
      amount: parseFloat(formData.amount),
      description: formData.description || undefined,
      reference: formData.reference || undefined,
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      isVirtual: false,
      payer: formData.payer,
    });

    setLoading(false);

    if (result.success) {
      setOpen(false);
      setFormData({
        type: ExpenseType.OTHER,
        amount: "",
        description: "",
        reference: "",
        payer: "company",
      });
    } else {
      alert(result.error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ ხარჯის დამატება</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ახალი ხარჯი</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">კატეგორია</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value as ExpenseType,
                })
              }
              className="w-full border rounded p-2"
              required
            >
              <option value={ExpenseType.MARKETING}>მარკეტინგი</option>
              <option value={ExpenseType.RENT}>ქირა</option>
              <option value={ExpenseType.SOFTWARE}>პროგრამები</option>
              <option value={ExpenseType.SALARY}>ხელფასი</option>
              <option value={ExpenseType.LOGISTICS}>ლოჯისტიკა</option>
              <option value={ExpenseType.TAX}>საგადასახადო</option>
              <option value={ExpenseType.OTHER}>სხვა</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">თანხა (₾)</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">აღწერა</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border rounded p-2"
              placeholder="Facebook Ads Campaign #1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              ვინ გადაიხადა?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="company"
                  checked={formData.payer === "company"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      payer: e.target.value as "company" | "founder",
                    })
                  }
                />
                კომპანიამ
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="founder"
                  checked={formData.payer === "founder"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      payer: e.target.value as "company" | "founder",
                    })
                  }
                />
                დამფუძნებელმა
              </label>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              გაუქმება
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "იტვირთება..." : "დამატება"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
