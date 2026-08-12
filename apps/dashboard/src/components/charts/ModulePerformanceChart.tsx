import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { chartTheme, tooltipStyle } from "./chartTheme";

const moduleData = [
  { module: "Patrol", score: 94 },
  { module: "Attendance", score: 89 },
  { module: "Incidents", score: 91 },
  { module: "Visitors", score: 96 },
];

export function ModulePerformanceChart() {
  return <div className="h-[190px] w-full" role="img" aria-label="Operational score by module">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={moduleData} layout="vertical" margin={{ top: 0, right: 30, left: 4, bottom: 0 }} accessibilityLayer>
        <CartesianGrid horizontal={false} stroke={chartTheme.line} strokeDasharray="3 4" />
        <XAxis type="number" domain={[0, 100]} hide />
        <YAxis type="category" dataKey="module" axisLine={false} tickLine={false} tick={{ fill: chartTheme.muted, fontSize: 12 }} width={78} />
        <Tooltip cursor={{ fill: "rgba(8, 118, 201, 0.05)" }} contentStyle={tooltipStyle} formatter={(value) => [`${value}%`, "Score"]} />
        <Bar dataKey="score" fill={chartTheme.brand} radius={[0, 5, 5, 0]} barSize={16} label={{ position: "right", fill: chartTheme.muted, fontSize: 11, formatter: (value: unknown) => `${value}%` }} />
      </BarChart>
    </ResponsiveContainer>
  </div>;
}
