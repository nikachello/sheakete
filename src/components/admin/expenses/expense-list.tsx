// components/admin/expenses/expense-list.tsx
import React from "react";
import { Expense } from "prisma/generated/prisma/client";

interface ExpenseListProps {
  expenses: Expense[];
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  return (
    <div className="space-y-2">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className={`flex justify-between items-center p-2 border rounded ${
            expense.isVirtual
              ? "text-gray-400 italic bg-gray-50" // grayed out + italic + subtle bg
              : "text-black bg-white"
          }`}
        >
          <div className="flex flex-col">
            <span className="font-medium">{expense.description}</span>
            <span className="text-xs text-gray-500">
              {expense.reference || "—"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {expense.isVirtual && (
              <span className="text-xs px-1 py-0.5 bg-gray-200 rounded">
                Included in product price
              </span>
            )}
            <span className="font-bold">₾{expense.amount.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
