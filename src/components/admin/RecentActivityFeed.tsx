import { formatDistanceToNow } from "date-fns";
import { ka } from "date-fns/locale";

interface RecentActivityItem {
  type: "order";
  id: string;
  message: string;
  timestamp: Date;
}

interface Props {
  activity: RecentActivityItem[];
}

export function RecentActivityFeed({ activity }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mt-6">
      <h2 className="text-lg font-semibold mb-3 border-b border-gray-200 pb-1 text-gray-900">
        ბოლო აქტივობები
      </h2>

      <div className="max-h-96 overflow-y-auto">
        <ul className="divide-y divide-gray-100 text-center">
          {activity.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium text-gray-800">
                {item.message}
              </span>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {formatDistanceToNow(new Date(item.timestamp), {
                  addSuffix: true,
                  locale: ka,
                })}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
