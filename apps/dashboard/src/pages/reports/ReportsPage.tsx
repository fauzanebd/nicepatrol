import {
  ArrowRightIcon,
  CalendarCheckIcon,
  DownloadSimpleIcon,
  IdentificationCardIcon,
  ShieldCheckIcon,
  SirenIcon,
} from "@phosphor-icons/react";
import { Button, LayerCard, PageHeading } from "@nicepatrol/ui";
import { ModulePerformanceChart } from "../../components/charts/ModulePerformanceChart";
import { OperationalScoreChart } from "../../components/charts/OperationalScoreChart";
import { OperationalTrendChart } from "../../components/charts/OperationalTrendChart";
import { SectionHeading } from "../../components/SectionHeading";

const reports = [
  {
    title: "Patrol performance",
    description: "Completion, duration, and missed checkpoint trends",
    icon: ShieldCheckIcon,
    updated: "Updated 4 minutes ago",
  },
  {
    title: "Attendance summary",
    description: "Presence, punctuality, and shift compliance",
    icon: CalendarCheckIcon,
    updated: "Updated 12 minutes ago",
  },
  {
    title: "Incident analysis",
    description: "Incident volume, severity, and resolution time",
    icon: SirenIcon,
    updated: "Updated 8 minutes ago",
  },
  {
    title: "Visitor activity",
    description: "Visit frequency, duration, and active visitor trends",
    icon: IdentificationCardIcon,
    updated: "Updated 2 minutes ago",
  },
];

export function ReportsPage() {
  return <div className="grid gap-6">
    <PageHeading
      eyebrow="Reporting"
      title="Operational reports"
      description="Review performance across patrols, attendance, visitors, and incidents."
      action={<Button variant="secondary" icon={DownloadSimpleIcon}>Export center</Button>}
    />

    <div className="grid gap-4 md:grid-cols-2">
      {reports.map(({ title, description, icon: Icon, updated }) => <LayerCard key={title} className="px-5 py-4 shadow-sm ring-1 ring-[var(--np-line)]">
        <div className="flex items-start gap-4">
          <span className="grid size-10 place-items-center rounded-[10px] bg-[var(--np-brand-soft)] text-[var(--np-brand)]">
            <Icon size={21} weight="fill" />
          </span>
          <div className="grid flex-1 gap-1">
            <h2 className="text-base font-semibold">{title}</h2>
            <p className="text-sm text-[var(--np-muted)]">{description}</p>
            <p className="mt-2 text-xs text-[var(--np-muted)]">{updated}</p>
          </div>
          <ArrowRightIcon size={18} className="text-[var(--np-muted)]" />
        </div>
      </LayerCard>)}
    </div>

    <div className="grid gap-5 xl:grid-cols-[.8fr_1.2fr]">
      <LayerCard className="px-5 py-4 shadow-sm ring-1 ring-[var(--np-line)]">
        <SectionHeading title="Monthly operational score" />
        <OperationalScoreChart />
        <ModulePerformanceChart />
      </LayerCard>

      <LayerCard className="px-5 py-4 shadow-sm ring-1 ring-[var(--np-line)]">
        <SectionHeading title="Six-month performance trend" />
        <p className="-mt-3 mb-4 text-xs text-[var(--np-muted)]">Composite module scores from March to August 2026</p>
        <OperationalTrendChart />
      </LayerCard>
    </div>
  </div>;
}
