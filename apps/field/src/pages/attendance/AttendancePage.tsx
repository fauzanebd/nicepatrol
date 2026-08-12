import { useNavigate } from "react-router-dom";
import { CameraIcon, FingerprintSimpleIcon, MapPinIcon, SignOutIcon } from "@phosphor-icons/react";
import { useFieldState } from "../../app/FieldState";
import { PrimaryButton } from "../../components/PrimaryButton";
import { TopBar } from "../../components/layout/TopBar";

const verificationItems = [
  { icon: MapPinIcon, title: "Location verified", detail: "Inside Gudang timur · 4.2 m accuracy" },
  { icon: CameraIcon, title: "Selfie verified", detail: "Identity match confirmed" },
];

export function AttendancePage() {
  const navigate = useNavigate();
  const { checkedIn, toggleAttendance } = useFieldState();
  return <><TopBar title="Attendance" back={() => navigate("/")} /><main className="grid gap-5 px-4 pb-28 pt-5">
    <section className="np-grid rounded-[16px] bg-white px-5 py-5 ring-1 ring-[var(--np-line)]"><div className="flex items-center justify-between"><div><p className="text-xs text-[var(--np-muted)]">Today’s shift</p><h1 className="mt-1 text-xl font-semibold">Shift pagi</h1></div><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${checkedIn ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{checkedIn ? "On duty" : "Not checked in"}</span></div><div className="mt-6 grid grid-cols-2 gap-4"><div><p className="text-xs text-[var(--np-muted)]">Schedule</p><p className="mt-1 font-medium">07:00—15:00</p></div><div><p className="text-xs text-[var(--np-muted)]">Area</p><p className="mt-1 font-medium">Gudang timur</p></div></div></section>
    <section className="rounded-[16px] bg-white p-4 ring-1 ring-[var(--np-line)]"><h2 className="font-medium">Verification</h2><div className="mt-4 grid gap-3">{verificationItems.map(({ icon: Icon, title, detail }) => <div key={title} className="flex items-center gap-3 rounded-[12px] bg-emerald-50 px-3 py-3"><span className="grid size-9 place-items-center rounded-full bg-emerald-500 text-white"><Icon size={19} weight="fill" /></span><div><p className="font-medium">{title}</p><p className="text-xs text-emerald-700">{detail}</p></div></div>)}</div></section>
    <PrimaryButton dark={checkedIn} icon={checkedIn ? SignOutIcon : FingerprintSimpleIcon} onClick={toggleAttendance}>{checkedIn ? "Clock out" : "Clock in"}</PrimaryButton>
    <section><h2 className="mb-3 text-base font-semibold">Recent attendance</h2><div className="divide-y divide-[var(--np-line)] overflow-hidden rounded-[14px] bg-white ring-1 ring-[var(--np-line)]">{[["11 August","06:57","15:04"],["10 August","07:01","15:02"],["9 August","06:54","15:00"]].map(([day,start,end]) => <div key={day} className="flex items-center justify-between px-4 py-3"><div><p className="font-medium">{day}</p><p className="text-xs text-[var(--np-muted)]">Shift pagi</p></div><p className="font-mono text-xs">{start}—{end}</p></div>)}</div></section>
  </main></>;
}
