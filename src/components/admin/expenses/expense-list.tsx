"use client";

import { Expense } from "prisma/generated/prisma/client";

interface ExpenseListProps {
  expenses: Expense[];
}

export function ExpenseList({ expenses }: ExpenseListProps) {
  return (
    <div className="space-y-2">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex justify-between items-center border-b pb-2"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 text-xs rounded ${
                  expense.paidFromBank
                    ? "bg-green-100 text-green-800"
                    : "bg-orange-100 text-orange-800"
                }`}
              >
                {expense.paidFromBank ? "კომპანია" : "დამფუძნებელი"}
              </span>
              <span className="font-medium">{expense.type}</span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {expense.description}
            </div>
            {expense.reference && (
              <div className="text-xs text-gray-500">
                Ref: {expense.reference}
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="font-bold">₾{expense.amount.toFixed(2)}</div>
            <div className="text-xs text-gray-500">
              {new Date(expense.createdAt).toLocaleDateString("ka-GE")}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
