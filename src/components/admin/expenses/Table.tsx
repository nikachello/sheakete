import { Expense } from "prisma/generated/prisma/client";

interface ExpensesTableProps {
  expenses: Expense[];
}

export function ExpensesTable({ expenses }: ExpensesTableProps) {
  return (
    <div className="rounded-md border overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-2 text-left">თარიღი</th>
            <th className="p-2 text-left">ტიპი</th>
            <th className="p-2 text-right">თანხა</th>
            <th className="p-2 text-left">აღწერა</th>
            <th className="p-2 text-left">რეფერენსი</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e.id} className="border-t">
              <td className="p-2">
                {new Date(e.createdAt).toLocaleDateString()}
              </td>
              <td className="p-2">{e.type}</td>
              <td className="p-2 text-right">{e.amount} ₾</td>
              <td className="p-2">{e.description ?? "-"}</td>
              <td className="p-2">{e.reference ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
