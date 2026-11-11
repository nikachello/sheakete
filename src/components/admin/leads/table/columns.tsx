"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Lead } from "@/types/leads";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Phone } from "lucide-react";
import { cancelLead, markAsNoAnswer } from "@/actions/admin/leads-actions";
import { useState } from "react";
import { OrderFormDialog } from "@/components/admin/orders/OrderFormDialog";

const StatusBadge = ({ status }: { status: string }) => {
  const variants: Record<string, { label: string; className: string }> = {
    PENDING: { label: "მოლოდინში", className: "bg-yellow-100 text-yellow-800" },
    CONFIRMED: {
      label: "დადასტურებული",
      className: "bg-green-100 text-green-800",
    },
    NO_ANSWER: { label: "არ პასუხობს", className: "bg-gray-100 text-gray-800" },
    CANCELLED: { label: "გაუქმებული", className: "bg-red-100 text-red-800" },
  };

  const variant = variants[status] || variants.PENDING;
  return <Badge className={variant.className}>{variant.label}</Badge>;
};

function ActionsCell({ lead }: { lead: Lead }) {
  const [convertDialogOpen, setConvertDialogOpen] = useState(false);

  const handleNoAnswer = async () => {
    await markAsNoAnswer(lead.id);
  };

  const handleCancel = async () => {
    if (confirm("დარწმუნებული ხართ რომ გსურთ ლიდის გაუქმება?")) {
      await cancelLead(lead.id);
    }
  };

  if (lead.status === "CONFIRMED" || lead.status === "CANCELLED") {
    return <span className="text-sm text-muted-foreground">-</span>;
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="default"
        className="bg-green-600 hover:bg-green-700"
        onClick={() => setConvertDialogOpen(true)}
      >
        <Check className="w-4 h-4 mr-1" />
        დადასტურება
      </Button>

      <Button size="sm" variant="outline" onClick={handleNoAnswer}>
        <Phone className="w-4 h-4 mr-1" />
        არ პასუხობს
      </Button>

      <Button size="sm" variant="destructive" onClick={handleCancel}>
        <X className="w-4 h-4" />
      </Button>

      <OrderFormDialog
        open={convertDialogOpen}
        onOpenChange={setConvertDialogOpen}
        mode="convert"
        leadId={lead.id}
        defaultValues={{
          customerName: lead.customerName,
          customerPhone: lead.customerPhone,
          city: lead.city || undefined,
          address: lead.address || undefined,
          productId: lead.productId || undefined,
          productTitle: lead.productTitle || undefined,
          expectedPrice: lead.expectedPrice || undefined,
          quantity: lead.quantity,
          comboDetails: lead.comboDetails || undefined,
          notes: lead.notes || undefined,
        }}
      />
    </div>
  );
}

export const leadColumns: ColumnDef<Lead>[] = [
  {
    accessorKey: "customerName",
    header: "მომხმარებელი",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("customerName")}</div>
    ),
  },
  {
    accessorKey: "customerPhone",
    header: "ტელეფონი",
    cell: ({ row }) => (
      <a
        href={`tel:${row.getValue("customerPhone")}`}
        className="text-blue-600 hover:underline"
      >
        {row.getValue("customerPhone")}
      </a>
    ),
  },
  {
    accessorKey: "productTitle",
    header: "პროდუქტი",
    cell: ({ row }) => {
      const title = row.getValue("productTitle") as string | null;
      return title ? (
        <span className="text-sm">{title}</span>
      ) : (
        <span className="text-sm text-muted-foreground">-</span>
      );
    },
  },
  {
    accessorKey: "expectedPrice",
    header: "ფასი",
    cell: ({ row }) => {
      const price = row.getValue("expectedPrice") as number | null;
      return price ? (
        <span className="font-medium">{price} ₾</span>
      ) : (
        <span className="text-sm text-muted-foreground">-</span>
      );
    },
  },
  {
    accessorKey: "city",
    header: "ქალაქი",
    cell: ({ row }) => {
      const city = row.getValue("city") as string | null;
      return city || <span className="text-sm text-muted-foreground">-</span>;
    },
  },
  {
    accessorKey: "status",
    header: "სტატუსი",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "createdAt",
    header: "თარიღი",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <span className="text-sm text-muted-foreground">
          {date.toLocaleDateString("ka-GE")}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "ქმედებები",
    cell: ({ row }) => <ActionsCell lead={row.original} />,
  },
];
