interface NeedsAttentionRow {
  id: string;
  status: string;
  amount: number;
  ageHours: number;
}

interface Props {
  rows: NeedsAttentionRow[];
}

export function NeedsAttentionTable({ rows }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mt-6">
      <h2 className="text-lg font-semibold mb-3 border-b border-gray-200 pb-1 text-gray-900">
        საყურადღებო მოვლენები
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse text-sm text-gray-800">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left font-medium">ID</th>
              <th className="p-2 text-left font-medium">სტატუსი</th>
              <th className="p-2 text-left font-medium">ფასი</th>
              <th className="p-2 text-left font-medium">
                განახლების დრო (საათი)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-2 font-medium">#{row.id}</td>
                <td className="p-2">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      row.status === "DELIVERED"
                        ? "bg-gray-200 text-gray-800"
                        : row.status === "RETURNED"
                          ? "bg-gray-800 text-white"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="p-2">{row.amount.toFixed(2)} GEL</td>
                <td className="p-2">{row.ageHours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
