import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { chartTheme, tooltipStyle } from "./chartTheme";

const scoreData = [
  { name: "Operational score", value: 92, fill: chartTheme.brand },
  { name: "Remaining", value: 8, fill: "#e6edf0" },
];

export function OperationalScoreChart() {
  return <div className="relative h-[190px] w-full" role="img" aria-label="Monthly operational score: 92 out of 100">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart accessibilityLayer>
        <Pie data={scoreData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={78} startAngle={90} endAngle={-270} stroke="none" cornerRadius={6} isAnimationActive />
        <Tooltip contentStyle={tooltipStyle} formatter={(value, name) => [name === "Remaining" ? `${value} points` : `${value}/100`, name]} />
      </PieChart>
    </ResponsiveContainer>
    <div className="pointer-events-none absolute inset-0 grid place-items-center text-center"><div><p className="text-4xl font-semibold leading-none">92</p><p className="mt-1 text-xs text-[var(--np-muted)]">Excellent</p></div></div>
  </div>;
}
