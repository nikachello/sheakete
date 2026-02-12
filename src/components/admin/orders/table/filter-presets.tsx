"use client";

import { ColumnFiltersState } from "@tanstack/react-table";
import { OrderStatus, PaymentStatus } from "prisma/generated/prisma/client";

export type FilterPreset = {
  id: string;
  label: string;
  filters: ColumnFiltersState;
  description?: string;
};

export const filterPresets: FilterPreset[] = [
  {
    id: "pending-orders",
    label: "მოსალოდნელი",
    filters: [{ id: "status", value: "PENDING" }],
    description: "ახალი შეკვეთები რომლებიც ელოდება დადასტურებას",
  },
  {
    id: "confirmed-orders",
    label: "დადასტურებული",
    filters: [{ id: "status", value: "CONFIRMED" }],
    description: "დადასტურებული შეკვეთები გასაგზავნად",
  },
  {
    id: "shipped-orders",
    label: "გაგზავნილი",
    filters: [{ id: "status", value: "SHIPPED" }],
    description: "გზაში მყოფი შეკვეთები",
  },
  {
    id: "delivered-orders",
    label: "მიტანილი",
    filters: [{ id: "status", value: "DELIVERED" }],
    description: "წარმატებით მიტანილი შეკვეთები",
  },
  {
    id: "awaiting-payment",
    label: "გადახდის მოლოდინში",
    filters: [
      { id: "paymentStatus", value: "AWAITING_COLLECTION" },
      { id: "status", value: "DELIVERED" },
    ],
    description: "მიტანილი მაგრამ გადაუხდელი",
  },
  {
    id: "collected-not-remitted",
    label: "შეგროვებული",
    filters: [{ id: "paymentStatus", value: "COLLECTED" }],
    description: "თანხა შეგროვებულია მაგრამ არ არის გადარიცხული",
  },
  {
    id: "problem-orders",
    label: "პრობლემური",
    filters: [{ id: "status", value: "NO_ANSWER" }],
    description: "უპასუხო ზარები და სხვა პრობლემები",
  },
  {
    id: "returns",
    label: "დაბრუნებები",
    filters: [{ id: "status", value: "RETURNED" }],
    description: "დაბრუნებული შეკვეთები",
  },
  {
    id: "cancelled",
    label: "გაუქმებული",
    filters: [{ id: "status", value: "CANCELLED" }],
    description: "გაუქმებული შეკვეთები",
  },
  {
    id: "today",
    label: "დღეს",
    filters: [],
    description: "დღეს შექმნილი შეკვეთები",
  },
  {
    id: "this-week",
    label: "ამ კვირაში",
    filters: [],
    description: "ამ კვირის შეკვეთები",
  },
];

export function getPresetFilters(presetId: string): ColumnFiltersState {
  const preset = filterPresets.find((p) => p.id === presetId);
  if (!preset) return [];

  switch (presetId) {
    case "today": {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return [{ id: "createdAt", value: [today, undefined] }];
    }
    case "this-week": {
      const today = new Date();
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      weekStart.setHours(0, 0, 0, 0);
      return [{ id: "createdAt", value: [weekStart, undefined] }];
    }
    default:
      return preset.filters;
  }
}

export function PresetFilters({
  activePreset,
  onPresetChange,
}: {
  activePreset: string | null;
  onPresetChange: (presetId: string | null) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onPresetChange(null)}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activePreset === null
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          ყველა
        </button>
        {filterPresets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onPresetChange(preset.id)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activePreset === preset.id
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
            title={preset.description}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
