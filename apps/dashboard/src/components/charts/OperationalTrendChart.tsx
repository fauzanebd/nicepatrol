import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { chartTheme, tooltipStyle } from "./chartTheme";

const trendData = [
  { month: "Mar", patrol: 84, attendance: 80, incidents: 76 },
  { month: "Apr", patrol: 87, attendance: 82, incidents: 79 },
  { month: "May", patrol: 86, attendance: 84, incidents: 83 },
  { month: "Jun", patrol: 91, attendance: 86, incidents: 85 },
  { month: "Jul", patrol: 93, attendance: 88, incidents: 89 },
  { month: "Aug", patrol: 94, attendance: 89, incidents: 91 },
];

export function OperationalTrendChart() {
  return <div className="h-[300px] w-full" role="img" aria-label="Six month trend for patrol, attendance, and incident response scores">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={trendData} margin={{ top: 10, right: 8, left: -20, bottom: 0 }} accessibilityLayer>
        <defs>
          <linearGradient id="patrolFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={chartTheme.brand} stopOpacity={0.25}/><stop offset="100%" stopColor={chartTheme.brand} stopOpacity={0}/></linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke={chartTheme.line} strokeDasharray="3 4" />
        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: chartTheme.muted, fontSize: 12 }} dy={8} />
        <YAxis domain={[70, 100]} axisLine={false} tickLine={false} tick={{ fill: chartTheme.muted, fontSize: 11 }} ticks={[70, 80, 90, 100]} />
        <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}%`]} />
        <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
        <Area type="monotone" dataKey="patrol" name="Patrol compliance" stroke={chartTheme.brand} strokeWidth={2.5} fill="url(#patrolFill)" />
        <Area type="monotone" dataKey="attendance" name="Attendance" stroke={chartTheme.success} strokeWidth={2} fill="transparent" />
        <Area type="monotone" dataKey="incidents" name="Incident response" stroke={chartTheme.warning} strokeWidth={2} fill="transparent" />
      </AreaChart>
    </ResponsiveContainer>
  </div>;
}
