"use client";

import { useState } from "react";
import { ExpenseType } from "@prisma-client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createExpense } from "@/actions/admin/expenses-actions";

export function AddExpenseDialog() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<ExpenseType>(ExpenseType.OTHER);
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [reference, setReference] = useState("");

  const handleSubmit = async () => {
    const now = new Date();
    await createExpense({
      type,
      amount,
      description,
      reference,
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    });
    setOpen(false);
    setAmount(0);
    setDescription("");
    setReference("");
    setType(ExpenseType.OTHER);
    // Optionally trigger refresh of parent page
    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">ხარჯის დამატება</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ახალი ხარჯი</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Select onValueChange={(v) => setType(v as ExpenseType)} value={type}>
            <SelectTrigger>
              <SelectValue placeholder="ტიპი" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ExpenseType).map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="თანხა"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <Input
            placeholder="აღწერა"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            placeholder="რეფერენსი"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
          <Button onClick={handleSubmit}>შენახვა</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
