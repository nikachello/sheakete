"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import type { DailyTraffic } from "@/services/analytics/site-analytics.service";

export function TrafficChart({ data }: { data: DailyTraffic[] }) {
  return (
    <div className="h-64 w-full" role="img" aria-label="Daily unique visitors and sessions in Asia/Tbilisi time">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tickFormatter={(date: string) => date.slice(5)} fontSize={11} />
          <YAxis allowDecimals={false} fontSize={11} />
          <Tooltip /><Legend />
          <Area type="monotone" dataKey="sessions" name="Sessions" stroke="#94a3b8" fill="#e2e8f0" />
          <Area type="monotone" dataKey="visitors" name="Unique visitors" stroke="#2563eb" fill="#dbeafe" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
