import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRightIcon, CheckCircleIcon, PlusIcon, QrCodeIcon } from "@phosphor-icons/react";
import { checkpoints as initialCheckpoints, type Patrol } from "@nicepatrol/domain";
import { mockApi } from "@nicepatrol/mock-api";
import { Button, LayerCard, OpsLabel, PageHeading, StatusBadge } from "@nicepatrol/ui";
import { LivePatrolMap } from "../../components/maps/LivePatrolMap";
import { SectionHeading } from "../../components/SectionHeading";
import { ActionNotice } from "../../components/feedback/ActionNotice";
import { CheckpointFormDialog } from "../../components/forms/CheckpointFormDialog";
import { PatrolFormDialog } from "../../components/forms/PatrolFormDialog";
import type { CheckpointFormValues, PatrolFormValues } from "../../components/forms/formSchemas";

export function PatrolsPage() {
  const [patrolDialogOpen, setPatrolDialogOpen] = useState(false);
  const [checkpointDialogOpen, setCheckpointDialogOpen] = useState(false);
  const [checkpointList, setCheckpointList] = useState(initialCheckpoints);
  const [scheduledPatrols, setScheduledPatrols] = useState<Patrol[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const { data: patrols = [] } = useQuery({ queryKey:["patrols"], queryFn:mockApi.getPatrols });
  const displayPatrols = [...scheduledPatrols, ...patrols];
  const handleSchedule = (values: PatrolFormValues) => {
    const checkpointCount = Number.parseInt(values.checkpointSet.match(/\d+/)?.[0] ?? "0", 10);
    setScheduledPatrols((current) => [{ id: `PTR-2408-${String(current.length + 4).padStart(2, "0")}`, officer: values.officer, route: values.route, area: values.area, progress: 0, checkpoints: `0 / ${checkpointCount}`, status: "scheduled", startedAt: values.startTime, nextCheckpoint: "Not started" }, ...current]);
    setNotice(`${values.route} scheduled for ${values.officer} on ${values.date} at ${values.startTime}.`);
  };
  const handleCheckpoint = (values: CheckpointFormValues) => {
    const id = `CP-${String(checkpointList.length + 1).padStart(2, "0")}`;
    setCheckpointList((current) => [...current, { id, name: values.name, area: values.area, status: "pending" }]);
    setNotice(`${id} · ${values.name} added using ${values.scanType.toUpperCase()} verification.`);
  };
  return <div className="grid gap-6"><PageHeading eyebrow="Patrol management" title="Live patrol operations" description="Monitor progress, checkpoint evidence, and field incidents in real time." action={<div className="flex gap-2"><Button variant="secondary" icon={QrCodeIcon} onClick={() => setCheckpointDialogOpen(true)}>Checkpoints</Button><Button variant="primary" icon={PlusIcon} onClick={() => setPatrolDialogOpen(true)}>Schedule patrol</Button></div>}/>
    <ActionNotice message={notice} onDismiss={() => setNotice(null)} />
    <section className="np-ops-grid isolate overflow-hidden rounded-[16px] bg-[var(--np-night)] text-white shadow-[var(--np-shadow)] ring-1 ring-slate-950"><div className="flex flex-col gap-4 border-b border-slate-700/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"><div className="grid gap-1"><OpsLabel inverse>PATROL // LIVE</OpsLabel><h2 className="text-xl font-semibold">Patroli Alpha-03</h2><p className="text-xs text-slate-400">PTR-2408-03 · Gudang timur</p></div><div className="flex items-center gap-2"><span className="np-live-pulse size-2.5 rounded-full bg-[var(--np-live)]"/><span className="font-mono text-xs text-sky-200">Live · updated 12 sec ago</span></div></div>
      <div className="grid lg:grid-cols-[1.25fr_.75fr]"><div className="relative min-h-[440px] overflow-hidden border-b border-slate-700/70 lg:border-b-0 lg:border-r"><div className="absolute inset-0"><LivePatrolMap/></div><div className="pointer-events-none absolute inset-0 z-[500] flex flex-col justify-between p-5"><div className="rounded-[10px] bg-slate-950/80 px-3 py-2 shadow-sm ring-1 ring-slate-700 backdrop-blur-sm self-start"><p className="font-mono text-[10px] text-slate-400">AREA COVERAGE</p><p className="mt-1 text-lg font-semibold">57%</p></div><div className="flex items-end justify-between"><div className="rounded-[10px] bg-slate-950/80 px-3 py-2 shadow-sm ring-1 ring-slate-700 backdrop-blur-sm"><p className="text-xs text-slate-400">Officer</p><p className="font-medium">Rizky Pratama</p><p className="font-mono text-[11px] text-slate-500">-6.2088, 106.8456</p></div><div className="rounded-[10px] bg-slate-950/80 px-3 py-2 text-right shadow-sm ring-1 ring-slate-700 backdrop-blur-sm"><p className="text-xs text-slate-400">Elapsed</p><p className="font-mono text-2xl">00:27:42</p></div></div></div></div>
        <div className="flex flex-col"><div className="border-b border-slate-700/70 px-5 py-4"><div className="mb-2 flex items-center justify-between"><p className="font-medium">Checkpoint progress</p><p className="font-mono text-xs text-sky-300">4 / {checkpointList.length}</p></div><div className="h-1.5 overflow-hidden rounded-full bg-slate-700"><div className="h-full w-[57%] rounded-full bg-[var(--np-live)]"/></div></div><div className="np-scrollbar max-h-[350px] flex-1 overflow-y-auto px-5 py-3">{checkpointList.map((checkpoint,index)=><div key={checkpoint.id} className="relative flex gap-3 pb-4 last:pb-0"><div className="flex flex-col items-center"><span className={`grid size-7 place-items-center rounded-full text-[11px] font-medium ring-1 ${checkpoint.status === "complete" ? "bg-emerald-400 text-emerald-950 ring-emerald-300" : checkpoint.status === "current" ? "bg-sky-300 text-sky-950 ring-sky-200" : "bg-slate-800 text-slate-400 ring-slate-600"}`}>{checkpoint.status === "complete" ? <CheckCircleIcon size={15} weight="fill"/> : index+1}</span>{index<checkpointList.length-1&&<span className="h-full w-px bg-slate-700"/>}</div><div className="flex min-w-0 flex-1 items-start justify-between pt-1"><div><p className={checkpoint.status === "pending" ? "text-slate-400" : "font-medium"}>{checkpoint.name}</p><p className="font-mono text-[10px] text-slate-500">{checkpoint.id}</p></div><span className="font-mono text-[11px] text-slate-400">{checkpoint.time ?? (checkpoint.status === "current" ? "NEXT" : "—")}</span></div></div>)}</div><div className="border-t border-slate-700/70 p-4"><button className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-white px-4 py-2.5 font-medium text-[var(--np-night)] hover:bg-sky-50">Open patrol detail <ArrowRightIcon size={16}/></button></div></div></div></section>
    <div><SectionHeading title="Today's patrols"/><LayerCard className="overflow-hidden shadow-sm ring-1 ring-[var(--np-line)]"><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead className="bg-slate-50 text-xs text-[var(--np-muted)]"><tr>{["Patrol","Officer","Started","Next checkpoint","Progress","Status"].map((header)=><th key={header} className="px-4 py-3 font-medium">{header}</th>)}</tr></thead><tbody>{displayPatrols.map((patrol)=><tr key={patrol.id} className="border-t border-[var(--np-line)]"><td className="px-4 py-3"><p className="font-medium">{patrol.route}</p><p className="font-mono text-[11px] text-[var(--np-muted)]">{patrol.id}</p></td><td className="px-4 py-3">{patrol.officer}</td><td className="px-4 py-3">{patrol.startedAt}</td><td className="px-4 py-3">{patrol.nextCheckpoint}</td><td className="px-4 py-3">{patrol.progress}%</td><td className="px-4 py-3"><StatusBadge tone={patrol.status === "active" ? "live" : patrol.status === "complete" ? "success" : patrol.status === "scheduled" ? "neutral" : "warning"}>{patrol.status}</StatusBadge></td></tr>)}</tbody></table></div></LayerCard></div>
    <PatrolFormDialog open={patrolDialogOpen} onOpenChange={setPatrolDialogOpen} mode="schedule" onSubmit={handleSchedule} />
    <CheckpointFormDialog open={checkpointDialogOpen} onOpenChange={setCheckpointDialogOpen} checkpoints={checkpointList} onSubmit={handleCheckpoint} />
  </div>;
}
