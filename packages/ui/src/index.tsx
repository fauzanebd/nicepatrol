import type { ComponentType, ReactNode } from "react";
import { LayerCard, Text } from "@cloudflare/kumo";
import { ShieldCheckIcon } from "@phosphor-icons/react";

export function Brand({ compact = false, inverse = false }: { compact?: boolean; inverse?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className={`grid size-9 place-items-center rounded-[10px] ${inverse ? "bg-white text-[var(--np-brand)]" : "bg-[var(--np-brand)] text-white"}`}>
        <ShieldCheckIcon size={21} weight="fill" />
      </span>
      {!compact && <span className={`text-[19px] font-semibold ${inverse ? "text-white" : "text-[var(--np-ink)]"}`}>nicepatrol</span>}
    </div>
  );
}

export function StatusBadge({ tone = "neutral", children }: { tone?: "neutral" | "live" | "success" | "warning" | "critical"; children: ReactNode }) {
  const styles = {
    neutral: "bg-slate-100 text-slate-700 ring-slate-200",
    live: "bg-sky-50 text-sky-700 ring-sky-200",
    success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    warning: "bg-amber-50 text-amber-800 ring-amber-200",
    critical: "bg-rose-50 text-rose-700 ring-rose-200",
  }[tone];
  return <span className={`inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium ring-1 ring-inset ${styles}`}>{children}</span>;
}

export function PageHeading({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="grid gap-1.5">
        {eyebrow && <p className="text-xs font-medium text-[var(--np-brand)]">{eyebrow}</p>}
        <h1 className="text-2xl font-semibold text-[var(--np-ink)] sm:text-[28px]">{title}</h1>
        {description && <Text DANGEROUS_className="max-w-2xl text-[var(--np-muted)]">{description}</Text>}
      </div>
      {action}
    </div>
  );
}

export function MetricCard({ label, value, detail, icon: Icon, tone = "brand" }: { label: string; value: string; detail: string; icon: ComponentType<{ size?: number; weight?: "regular" | "fill" }>; tone?: "brand" | "success" | "warning" | "critical" }) {
  const toneClass = {
    brand: "bg-sky-50 text-sky-700",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
    critical: "bg-rose-50 text-rose-700",
  }[tone];
  return (
    <LayerCard className="px-4 py-3.5 shadow-sm ring-1 ring-[var(--np-line)]">
      <div className="flex items-start justify-between gap-4">
        <div className="grid gap-1">
          <Text DANGEROUS_className="text-[var(--np-muted)]">{label}</Text>
          <p className="text-[26px] font-semibold leading-none text-[var(--np-ink)]">{value}</p>
          <p className="text-xs text-[var(--np-muted)]">{detail}</p>
        </div>
        <span className={`grid size-9 place-items-center rounded-[10px] ${toneClass}`}><Icon size={19} weight="fill" /></span>
      </div>
    </LayerCard>
  );
}

export function OpsLabel({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return <span className={`font-mono text-[11px] font-medium ${inverse ? "text-sky-300" : "text-[var(--np-brand)]"}`}>{children}</span>;
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="grid min-h-40 place-items-center rounded-xl bg-slate-50 px-6 py-8 text-center ring-1 ring-inset ring-[var(--np-line)]"><div className="grid gap-1"><p className="font-medium">{title}</p><p className="text-sm text-[var(--np-muted)]">{description}</p></div></div>;
}

export { Button, Dialog, Field, Input, LayerCard, Select, Text, Textarea } from "@cloudflare/kumo";
