import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ClockCountdownIcon, IdentificationCardIcon, PlusIcon, SlidersHorizontalIcon, TrendUpIcon } from "@phosphor-icons/react";
import { mockApi } from "@nicepatrol/mock-api";
import { Button, LayerCard, MetricCard, PageHeading, StatusBadge } from "@nicepatrol/ui";
import type { Visitor } from "@nicepatrol/domain";
import { ActionNotice } from "../../components/feedback/ActionNotice";
import { VisitorRegistrationDialog } from "../../components/forms/VisitorRegistrationDialog";
import type { VisitorFormValues } from "../../components/forms/formSchemas";

export function VisitorsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [registeredVisitors, setRegisteredVisitors] = useState<Visitor[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const { data:visitors=[] }=useQuery({queryKey:["visitors"],queryFn:mockApi.getVisitors});
  const displayVisitors = [...registeredVisitors, ...visitors];
  const handleRegister = (values: VisitorFormValues) => {
    const visitor: Visitor = { id: `VST-${1050 + registeredVisitors.length}`, name: values.name, company: values.company, phone: values.phone, host: values.host, purpose: values.purpose, badge: values.badge, checkedInAt: "10:16", status: "Active" };
    setRegisteredVisitors((current) => [visitor, ...current]);
    setNotice(`${values.name} registered at ${values.entrance} with badge ${values.badge}.`);
  };
  return <div className="grid gap-6"><PageHeading eyebrow="Visitor management" title="Visitors" description="Track active guests and review visit history across all entrances." action={<Button variant="primary" icon={PlusIcon} onClick={() => setDialogOpen(true)}>Register visitor</Button>}/><ActionNotice message={notice} onDismiss={() => setNotice(null)} /><div className="grid gap-3 sm:grid-cols-3"><MetricCard label="Active visitors" value={String(12 + registeredVisitors.length)} detail="Across 3 entrances" icon={IdentificationCardIcon}/><MetricCard label="Expected today" value="7" detail="4 have arrived" icon={ClockCountdownIcon} tone="warning"/><MetricCard label="Visits this month" value={String(284 + registeredVisitors.length)} detail="+12% from July" icon={TrendUpIcon} tone="success"/></div><LayerCard className="overflow-hidden shadow-sm ring-1 ring-[var(--np-line)]"><div className="flex flex-col gap-3 border-b border-[var(--np-line)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"><p className="font-medium">Active visitors</p><div className="flex gap-2"><button className="rounded-[8px] bg-slate-50 px-3 py-2 text-xs text-[var(--np-muted)] ring-1 ring-inset ring-[var(--np-line)]">Search visitors</button><Button variant="secondary" icon={SlidersHorizontalIcon}>Filter</Button></div></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead className="bg-slate-50 text-xs text-[var(--np-muted)]"><tr>{["Visitor","Company","Host","Purpose","Badge","Checked in"].map((header)=><th key={header} className="px-4 py-3 font-medium">{header}</th>)}</tr></thead><tbody>{displayVisitors.map((visitor)=><tr key={visitor.id} className="border-t border-[var(--np-line)]"><td className="px-4 py-3"><p className="font-medium">{visitor.name}</p><p className="font-mono text-[11px] text-[var(--np-muted)]">{visitor.id}</p></td><td className="px-4 py-3">{visitor.company}</td><td className="px-4 py-3">{visitor.host}</td><td className="px-4 py-3">{visitor.purpose}</td><td className="px-4 py-3"><StatusBadge tone="live">{visitor.badge}</StatusBadge></td><td className="px-4 py-3 font-mono text-[12px]">{visitor.checkedInAt}</td></tr>)}</tbody></table></div></LayerCard><VisitorRegistrationDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={handleRegister} /></div>;
}
