import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { confirmLeadAndCreateOrder } from "@/actions/admin/leads-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ConfirmDialogProps {
  leadId: string;
  onClose: () => void;
  defaultCity?: string;
  defaultAddress?: string;
  productTitle?: string;
  expectedPrice?: number;
}

export function ConfirmLeadDialog({
  leadId,
  onClose,
  defaultCity,
  defaultAddress,
  productTitle,
  expectedPrice,
}: ConfirmDialogProps) {
  const [open, setOpen] = useState(true);
  const [city, setCity] = useState(defaultCity || "");
  const [address, setAddress] = useState(defaultAddress || "");
  const [price, setPrice] = useState(expectedPrice || 0);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await confirmLeadAndCreateOrder(leadId, {
        city,
        address,
        productTitle,
        expectedPrice: price,
      });
      setOpen(false);
      onClose();
      setCity("");
      setAddress("");
    } catch (error) {
      setCity("");
      setAddress("");
      console.error("Error confirming lead:", error);
      setLoading(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>დადასტურება</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2 mt-2">
          <Input
            placeholder="ქალაქი"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Input
            placeholder="მისამართი"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Input
            type="text"
            placeholder="თანხა"
            value={price.toString()}
            onChange={(e) => {
              // Allow only digits and optionally one decimal point
              const value = e.target.value.replace(/[^0-9.]/g, "");
              // Allow only one dot
              const dots = value.split(".");
              const sanitized =
                dots.length > 2
                  ? dots[0] + "." + dots.slice(1).join("")
                  : value;
              setPrice(sanitized === "" ? 0 : parseFloat(sanitized));
            }}
          />
        </div>

        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={loading}
          >
            გაუქმება
          </Button>
          <Button onClick={handleConfirm} disabled={loading}>
            {loading ? "დაელოდეთ..." : "დადასტურება"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
