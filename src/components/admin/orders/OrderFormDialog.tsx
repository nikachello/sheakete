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
import { createOrder } from "@/actions/admin/orders-actions";
import { confirmLeadAndCreateOrder } from "@/actions/admin/leads-actions";
import { getProducts } from "@/actions/admin/products-actions";

type Product = {
  _id: string;
  title: string;
  price: number;
  unit?: string;
  combos?: Array<{
    quantity: number;
    totalPrice: number;
    unitPrice?: number;
    isPopular?: boolean;
  }>;
};

type FieldError = { field: string; message: string };

interface OrderFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "convert";
  leadId?: string;
  defaultValues?: {
    customerName?: string;
    customerPhone?: string;
    city?: string;
    address?: string;
    productId?: string;
    productTitle?: string;
    expectedPrice?: number;
    notes?: string;
  };
}

// Reusable field wrapper component
function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label className="text-right">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="col-span-3 space-y-1">
        {children}
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    </div>
  );
}

export function OrderFormDialog({
  open,
  onOpenChange,
  mode,
  leadId,
  defaultValues = {},
}: OrderFormDialogProps) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCombo, setSelectedCombo] = useState("");
  const [formData, setFormData] = useState({
    customerName: defaultValues.customerName || "",
    customerPhone: defaultValues.customerPhone || "",
    city: defaultValues.city || "",
    address: defaultValues.address || "",
    productId: defaultValues.productId || "",
    comboDetails: "",
    quantity: "1",
    expectedPrice: defaultValues.expectedPrice?.toString() || "",
    productCost: "",
    shippingFee: "",
    additionalCosts: "",
    notes: defaultValues.notes || "",
  });
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [generalError, setGeneralError] = useState("");

  useEffect(() => {
    if (open) {
      setErrors([]);
      setGeneralError("");
      getProducts().then((prods) => {
        setProducts(prods);
        // Pre-select product if provided
        if (defaultValues.productId) {
          const product = prods.find(
            (p: Product) => p._id === defaultValues.productId
          );
          if (product) {
            setSelectedProduct(product);
          }
        }
      });
    }
  }, [open, defaultValues.productId]);

  const resetForm = () => {
    setFormData({
      customerName: "",
      customerPhone: "",
      city: "",
      address: "",
      productId: "",
      comboDetails: "",
      quantity: "1",
      expectedPrice: "",
      productCost: "",
      shippingFee: "",
      additionalCosts: "",
      notes: "",
    });
    setSelectedProduct(null);
    setSelectedCombo("");
    setErrors([]);
    setGeneralError("");
  };

  const handleProductChange = (productId: string) => {
    const product = products.find((p) => p._id === productId) || null;
    setSelectedProduct(product);
    setSelectedCombo("");
    setFormData((prev) => ({
      ...prev,
      productId,
      expectedPrice: "",
      quantity: "1",
    }));
  };

  const handleComboChange = (comboIndex: string) => {
    setSelectedCombo(comboIndex);
    const combo = selectedProduct?.combos?.[parseInt(comboIndex)];
    if (combo) {
      setFormData((prev) => ({
        ...prev,
        expectedPrice: combo.totalPrice.toString(),
        quantity: combo.quantity.toString(),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setGeneralError("");

    // Format phone with +995 prefix
    const rawPhone = formData.customerPhone;
    const formattedPhone = rawPhone.startsWith("+995")
      ? rawPhone
      : `+995${rawPhone.replace(/^\+?995?/, "")}`;

    // Build combo details
    const comboDetails =
      selectedCombo && selectedProduct
        ? `${selectedProduct.combos?.[parseInt(selectedCombo)]?.quantity} ${selectedProduct.unit || "ცალი"}`
        : formData.comboDetails || undefined;

    const orderData = {
      customerName: formData.customerName,
      customerPhone: formattedPhone,
      city: formData.city || undefined,
      address: formData.address || undefined,
      productId: selectedProduct?._id || undefined,
      productTitle: selectedProduct?.title || undefined,
      comboDetails,
      quantity: parseInt(formData.quantity) || 1,
      expectedPrice: parseFloat(formData.expectedPrice) || 0,
      productCost: parseFloat(formData.productCost) || 0,
      shippingFee: parseFloat(formData.shippingFee) || 0,
      additionalCosts: parseFloat(formData.additionalCosts) || 0,
      notes: formData.notes || undefined,
    };

    try {
      let res;
      if (mode === "convert" && leadId) {
        // Convert lead to order
        await confirmLeadAndCreateOrder(leadId, orderData);
        res = { success: true };
      } else {
        // Create new order
        res = await createOrder(orderData);
      }

      if (!res.success) {
        if ("errors" in res && res.errors) setErrors(res.errors);
        else if ("error" in res && res.error) setGeneralError(res.error);
        return;
      }

      onOpenChange(false);
      resetForm();
    } catch {
      setGeneralError("დაფიქსირდა შეცდომა. გთხოვთ სცადოთ თავიდან.");
    } finally {
      setLoading(false);
    }
  };

  const getError = (field: string) =>
    errors.find((e) => e.field === field)?.message;

  const showComboSelect =
    selectedProduct?.combos && selectedProduct.combos.length > 0;
  const showManualCombo =
    selectedProduct && (!showComboSelect || !selectedCombo);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "convert"
              ? "ლიდის დადასტურება"
              : "ახალი შეკვეთის დამატება"}
          </DialogTitle>
          <DialogDescription>
            {mode === "convert"
              ? "გადაიყვანეთ ლიდი შეკვეთად და შეავსეთ დეტალები"
              : "შეავსეთ შეკვეთის დეტალები"}
          </DialogDescription>
        </DialogHeader>

        {generalError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-red-700 text-sm">{generalError}</p>
          </div>
        )}

        {errors.length > 0 && (
          <div className="p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-red-700 text-sm font-medium mb-2">
              გთხოვთ გამოასწოროთ შემდეგი შეცდომები:
            </p>
            {errors.map((err, idx) => (
              <div key={idx} className="text-red-600 text-sm">
                • {err.message}
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="მომხმარებელი"
            error={getError("customerName")}
            required
          >
            <Input
              value={formData.customerName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  customerName: e.target.value,
                }))
              }
              placeholder="სახელი გვარი"
              required
            />
          </FormField>

          <FormField
            label="ტელეფონი"
            error={getError("customerPhone")}
            required
          >
            <Input
              value={formData.customerPhone}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  customerPhone: e.target.value,
                }))
              }
              placeholder="5XX XX XX XX"
              required
            />
          </FormField>

          <FormField label="ქალაქი" error={getError("city")}>
            <Input
              value={formData.city}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, city: e.target.value }))
              }
              placeholder="თბილისი"
            />
          </FormField>

          <FormField label="მისამართი" error={getError("address")}>
            <Input
              value={formData.address}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
              placeholder="ზუსტი მისამართი"
            />
          </FormField>

          <FormField label="პროდუქტი" error={getError("productId")} required>
            <Select
              value={formData.productId}
              onValueChange={handleProductChange}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="აირჩიეთ პროდუქტი" />
              </SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={p._id} value={p._id}>
                    {p.title} - {p.price} ₾
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {showComboSelect && (
            <FormField label="შეთავაზება" error={getError("comboDetails")}>
              <Select onValueChange={handleComboChange} value={selectedCombo}>
                <SelectTrigger>
                  <SelectValue placeholder="აირჩიეთ შეთავაზება" />
                </SelectTrigger>
                <SelectContent>
                  {selectedProduct.combos!.map((combo, idx) => (
                    <SelectItem key={idx} value={idx.toString()}>
                      {combo.quantity} {selectedProduct.unit || "ცალი"} -{" "}
                      {combo.totalPrice} ₾{combo.isPopular && " (პოპულარული)"}
                      {combo.unitPrice && ` • ${combo.unitPrice}₾/ცალი`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          )}

          {showManualCombo && (
            <FormField label="კომბო დეტალები" error={getError("comboDetails")}>
              <Input
                value={formData.comboDetails}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    comboDetails: e.target.value,
                  }))
                }
                placeholder="ზომა, ფერი, რაოდენობა"
              />
            </FormField>
          )}

          <FormField label="რაოდენობა" error={getError("quantity")}>
            <Input
              type="number"
              min={1}
              value={formData.quantity}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, quantity: e.target.value }))
              }
            />
          </FormField>

          <FormField
            label="მოსალოდნელი ფასი"
            error={getError("expectedPrice")}
            required
          >
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.expectedPrice}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  expectedPrice: e.target.value,
                }))
              }
              required
            />
          </FormField>

          <div className="border-t pt-4 space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground">
              ღირებულებები (COGS)
            </h3>

            <FormField
              label="პროდუქტის ღირებულება"
              error={getError("productCost")}
            >
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.productCost}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    productCost: e.target.value,
                  }))
                }
              />
              <p className="text-xs text-muted-foreground mt-1">
                მხოლოდ პროდუქტის ფასი (მიწოდება + გადასახადი ცალ-ცალკე)
              </p>
            </FormField>

            <FormField
              label="მიწოდების საფასური"
              error={getError("shippingFee")}
            >
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.shippingFee}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    shippingFee: e.target.value,
                  }))
                }
              />
            </FormField>

            <FormField
              label="დამატებითი ხარჯები"
              error={getError("additionalCosts")}
            >
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.additionalCosts}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    additionalCosts: e.target.value,
                  }))
                }
              />
            </FormField>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">შენიშვნები</Label>
            <div className="col-span-3 space-y-1">
              <Textarea
                rows={3}
                placeholder="დამატებითი ინფორმაცია..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
              />
              {getError("notes") && (
                <p className="text-red-600 text-sm">{getError("notes")}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              გაუქმება
            </Button>
            <Button type="submit" disabled={loading}>
              {loading
                ? "მიმდინარეობს..."
                : mode === "convert"
                  ? "დადასტურება"
                  : "დამატება"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
