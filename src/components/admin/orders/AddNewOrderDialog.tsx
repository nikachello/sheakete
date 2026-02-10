// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Plus } from "lucide-react";
// import { createOrder } from "@/actions/admin/orders-actions";
// import { getProducts } from "@/actions/admin/products-actions";

// type Product = {
//   _id: string;
//   title: string;
//   price: number;
//   unit?: string;
//   combos?: Array<{
//     quantity: number;
//     totalPrice: number;
//     unitPrice?: number;
//     isPopular?: boolean;
//   }>;
// };

// type FieldError = { field: string; message: string };

// // Reusable field wrapper component
// function FormField({
//   label,
//   error,
//   required,
//   children,
// }: {
//   label: string;
//   error?: string;
//   required?: boolean;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="grid grid-cols-4 items-center gap-4">
//       <Label className="text-right">
//         {label} {required && "*"}
//       </Label>
//       <div className="col-span-3 space-y-1">
//         {children}
//         {error && <p className="text-red-600 text-sm">{error}</p>}
//       </div>
//     </div>
//   );
// }

// export function AddOrderDialog() {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [selectedCombo, setSelectedCombo] = useState("");
//   const [expectedPrice, setExpectedPrice] = useState("");
//   const [quantity, setQuantity] = useState("1");
//   const [errors, setErrors] = useState<FieldError[]>([]);
//   const [generalError, setGeneralError] = useState("");

//   useEffect(() => {
//     if (open) {
//       setErrors([]);
//       getProducts().then(setProducts);
//     }
//   }, [open]);

//   const resetForm = () => {
//     setSelectedProduct(null);
//     setSelectedCombo("");
//     setExpectedPrice("");
//     setQuantity("1");
//     setErrors([]);
//     setGeneralError("");
//   };

//   const handleProductChange = (productId: string) => {
//     const product = products.find((p) => p._id === productId) || null;
//     setSelectedProduct(product);
//     setSelectedCombo("");
//     setExpectedPrice("");
//     setQuantity("1");
//   };

//   const handleComboChange = (comboIndex: string) => {
//     setSelectedCombo(comboIndex);
//     const combo = selectedProduct?.combos?.[parseInt(comboIndex)];
//     if (combo) {
//       setExpectedPrice(combo.totalPrice.toString());
//       setQuantity(combo.quantity.toString());
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrors([]);
//     setGeneralError("");

//     const formData = new FormData(e.currentTarget);
//     const getValue = (key: string) => formData.get(key) as string;

//     // Build combo details from selected combo or manual input
//     const comboDetails =
//       selectedCombo && selectedProduct
//         ? `${selectedProduct.combos?.[parseInt(selectedCombo)]?.quantity} ${selectedProduct.unit || "ცალი"}`
//         : getValue("comboDetails") || undefined;

//     // Format phone with +995 prefix
//     const rawPhone = getValue("customerPhone") || "";
//     const formattedPhone = rawPhone.startsWith("+995")
//       ? rawPhone
//       : `+995${rawPhone.replace(/^\+?995?/, "")}`;

//     const data = {
//       customerName: getValue("customerName"),
//       customerPhone: formattedPhone,
//       city: getValue("city") || undefined,
//       address: getValue("address") || undefined,
//       productId: selectedProduct?._id || undefined,
//       productTitle: selectedProduct?.title || undefined,
//       comboDetails,
//       quantity: parseInt(quantity) || 1,
//       expectedPrice: parseFloat(expectedPrice) || 0,
//       productCost: parseFloat(getValue("productCost")) || 0,
//       shippingFee: parseFloat(getValue("shippingFee")) || 0,
//       additionalCosts: parseFloat(getValue("additionalCosts")) || 0,
//       notes: getValue("notes") || undefined,
//     };

//     try {
//       const res = await createOrder(data);

//       if (!res.success) {
//         if (res.errors) setErrors(res.errors);
//         else if (res.error) setGeneralError(res.error);
//         return;
//       }

//       setOpen(false);
//       e.currentTarget.reset();
//       resetForm();
//     } catch {
//       setGeneralError("დაფიქსირდა შეცდომა. გთხოვთ სცადოთ თავიდან.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getError = (field: string) =>
//     errors.find((e) => e.field === field)?.message;

//   const showComboSelect =
//     selectedProduct?.combos && selectedProduct.combos.length > 0;
//   const showManualCombo =
//     selectedProduct && (!showComboSelect || !selectedCombo);

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button>
//           <Plus className="w-4 h-4 mr-2" />
//           ახალი შეკვეთა
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>ახალი შეკვეთის დამატება</DialogTitle>
//           <DialogDescription>შეავსეთ შეკვეთის დეტალები</DialogDescription>
//         </DialogHeader>

//         {generalError && (
//           <div className="p-3 bg-red-50 border border-red-200 rounded">
//             <p className="text-red-700 text-sm">{generalError}</p>
//           </div>
//         )}

//         {errors.length > 0 && (
//           <div className="p-3 bg-red-50 border border-red-200 rounded">
//             <p className="text-red-700 text-sm font-medium mb-2">
//               გთხოვთ გამოასწოროთ შემდეგი შეცდომები:
//             </p>
//             {errors.map((err, idx) => (
//               <div key={idx} className="text-red-600 text-sm">
//                 • {err.message}
//               </div>
//             ))}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <FormField
//             label="მომხმარებელი"
//             error={getError("customerName")}
//             required
//           >
//             <Input name="customerName" placeholder="სახელი გვარი" required />
//           </FormField>

//           <FormField
//             label="ტელეფონი"
//             error={getError("customerPhone")}
//             required
//           >
//             <Input name="customerPhone" placeholder="5XX XX XX XX" required />
//           </FormField>

//           <FormField label="ქალაქი" error={getError("city")}>
//             <Input name="city" placeholder="თბილისი" />
//           </FormField>

//           <FormField label="მისამართი" error={getError("address")}>
//             <Input name="address" placeholder="ზუსტი მისამართი" />
//           </FormField>

//           <FormField label="პროდუქტი" error={getError("productId")} required>
//             <Select onValueChange={handleProductChange} required>
//               <SelectTrigger>
//                 <SelectValue placeholder="აირჩიეთ პროდუქტი" />
//               </SelectTrigger>
//               <SelectContent>
//                 {products.map((p) => (
//                   <SelectItem key={p._id} value={p._id}>
//                     {p.title} - {p.price} ₾
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </FormField>

//           {showComboSelect && (
//             <FormField label="შეთავაზება" error={getError("comboDetails")}>
//               <Select onValueChange={handleComboChange} value={selectedCombo}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="აირჩიეთ შეთავაზება" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {selectedProduct.combos!.map((combo, idx) => (
//                     <SelectItem key={idx} value={idx.toString()}>
//                       {combo.quantity} {selectedProduct.unit || "ცალი"} -{" "}
//                       {combo.totalPrice} ₾{combo.isPopular && " (პოპულარული)"}
//                       {combo.unitPrice && ` • ${combo.unitPrice}₾/ცალი`}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </FormField>
//           )}

//           {showManualCombo && (
//             <FormField label="კომბო დეტალები" error={getError("comboDetails")}>
//               <Input name="comboDetails" placeholder="ზომა, ფერი, რაოდენობა" />
//             </FormField>
//           )}

//           <FormField label="რაოდენობა" error={getError("quantity")}>
//             <Input
//               name="quantity"
//               type="number"
//               min={1}
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//             />
//           </FormField>

//           <FormField
//             label="მოსალოდნელი ფასი"
//             error={getError("expectedPrice")}
//             required
//           >
//             <Input
//               name="expectedPrice"
//               type="number"
//               step="0.01"
//               placeholder="0.00"
//               value={expectedPrice}
//               onChange={(e) => setExpectedPrice(e.target.value)}
//               required
//             />
//           </FormField>

//           <FormField
//             label="პროდუქტის ღირებულება"
//             error={getError("productCost")}
//           >
//             <Input
//               name="productCost"
//               type="number"
//               step="0.01"
//               placeholder="0.00"
//             />
//           </FormField>

//           <FormField label="მიწოდების საფასური" error={getError("shippingFee")}>
//             <Input
//               name="shippingFee"
//               type="number"
//               step="0.01"
//               placeholder="0.00"
//             />
//           </FormField>

//           <FormField
//             label="დამატებითი ხარჯები"
//             error={getError("additionalCosts")}
//           >
//             <Input
//               name="additionalCosts"
//               type="number"
//               step="0.01"
//               placeholder="0.00"
//             />
//           </FormField>

//           <div className="grid grid-cols-4 items-start gap-4">
//             <Label className="text-right pt-2">შენიშვნები</Label>
//             <div className="col-span-3 space-y-1">
//               <Textarea
//                 name="notes"
//                 rows={3}
//                 placeholder="დამატებითი ინფორმაცია..."
//               />
//               {getError("notes") && (
//                 <p className="text-red-600 text-sm">{getError("notes")}</p>
//               )}
//             </div>
//           </div>

//           <DialogFooter>
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => setOpen(false)}
//               disabled={loading}
//             >
//               გაუქმება
//             </Button>
//             <Button type="submit" disabled={loading}>
//               {loading ? "მიმდინარეობს..." : "დამატება"}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { OrderFormDialog } from "./OrderFormDialog";

export function AddOrderDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="w-4 h-4 mr-2" />
        ახალი შეკვეთა
      </Button>

      <OrderFormDialog open={open} onOpenChange={setOpen} mode="create" />
    </>
  );
}
