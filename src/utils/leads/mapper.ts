import { LeadsStats, LeadStatCard } from "@/types/leads";
import {
  formatNumber,
  formatTrendValue,
  getTodayTrendText,
} from "../formatters";

export function leadsStatsToCards(stats: LeadsStats): LeadStatCard[] {
  return [
    // Card 1: Active Leads
    {
      id: "active-leads",
      title: stats.activeLeads.label,
      value: formatNumber(stats.activeLeads.count),
      description: "საჭიროებს დარეკვას და დამუშავებას",
      footerText: "აქტიური ლიდების რაოდენობა",
      trend: null,
    },

    // Card 2: Conversion Rate
    {
      id: "conversion-rate",
      title: stats.conversionRate.label,
      value: `${stats.conversionRate.percentage.toFixed(1)}%`,
      description: `${stats.conversionRate.confirmed} დადასტურებული ${stats.conversionRate.total}-დან`,
      footerText: "ბოლო 7 დღის მონაცემები",
      trend:
        stats.conversionRate.percentage > 0
          ? {
              value: `${stats.conversionRate.percentage.toFixed(1)}%`,
              type: stats.conversionRate.percentage >= 50 ? "up" : "down",
              isPositive: stats.conversionRate.percentage >= 50,
            }
          : null,
    },

    // Card 3: Needs Follow-up
    {
      id: "needs-follow-up",
      title: stats.needsFollowUp.label,
      value: formatNumber(stats.needsFollowUp.count),
      description: "არ პასუხობენ ზარს",
      footerText:
        stats.needsFollowUp.count > 0
          ? "საჭიროებს ყურადღებას!"
          : "ყველა დარეკილია",
      trend:
        stats.needsFollowUp.count > 0
          ? {
              value: "Monitor",
              type: "down",
              isPositive: false,
            }
          : null,
    },

    // Card 4: Today's Leads
    {
      id: "today-leads",
      title: stats.todayLeads.label,
      value: formatNumber(stats.todayLeads.count),
      description: `გუშინ იყო ${stats.todayLeads.yesterdayCount}`,
      footerText: getTodayTrendText(stats.todayLeads.trend),
      trend: {
        value: formatTrendValue(stats.todayLeads.trend),
        type:
          stats.todayLeads.trend > 0
            ? "up"
            : stats.todayLeads.trend < 0
              ? "down"
              : "neutral",
        isPositive: stats.todayLeads.trend >= 0,
      },
    },
  ];
}
