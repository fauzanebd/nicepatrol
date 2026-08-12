import type { ReactNode } from "react";
export function SectionHeading({ title, action }: { title: string; action?: ReactNode }) {
  return <div className="mb-3 flex items-center justify-between"><h2 className="text-base font-semibold">{title}</h2>{action}</div>;
}
