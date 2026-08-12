import { Bar, BarChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { chartTheme, tooltipStyle } from "./chartTheme";

const coverageData = [
  { day: "Thu", completion: 82 },
  { day: "Fri", completion: 88 },
  { day: "Sat", completion: 91 },
  { day: "Sun", completion: 84 },
  { day: "Mon", completion: 96 },
  { day: "Tue", completion: 94 },
  { day: "Today", completion: 92 },
];

export function PatrolCoverageChart() {
  return <div className="h-[220px] w-full" role="img" aria-label="Patrol completion for the last seven days">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={coverageData} margin={{ top: 12, right: 4, left: -24, bottom: 0 }} accessibilityLayer>
        <CartesianGrid vertical={false} stroke={chartTheme.line} strokeDasharray="3 4" />
        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: chartTheme.muted, fontSize: 12 }} dy={8} />
        <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: chartTheme.muted, fontSize: 11 }} ticks={[0, 50, 100]} />
        <Tooltip cursor={{ fill: "rgba(8, 118, 201, 0.05)" }} contentStyle={tooltipStyle} formatter={(value) => [`${value}%`, "Completion"]} />
        <ReferenceLine y={90} stroke={chartTheme.brandSoft} strokeDasharray="5 5" label={{ value: "Target 90%", position: "insideTopRight", fill: chartTheme.muted, fontSize: 11 }} />
        <Bar dataKey="completion" fill={chartTheme.brand} radius={[5, 5, 0, 0]} maxBarSize={44} />
      </BarChart>
    </ResponsiveContainer>
  </div>;
}
