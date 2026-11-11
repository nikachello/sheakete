"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { repayFounderLoan } from "@/actions/admin/expenses-actions";

export function PayOwnerDialog() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = async () => {
    await repayFounderLoan(amount);
    setOpen(false);
    setAmount(0);
    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">გადახდა</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>დააფიქსირეთ ვალის გადახდა</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="number"
            placeholder="თანხა"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <Button onClick={handleSubmit}>გადახდა</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
