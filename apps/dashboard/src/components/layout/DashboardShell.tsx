import { useState, type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import {
  AlarmIcon, CalendarCheckIcon, ChartLineUpIcon, GearSixIcon, HouseIcon,
  IdentificationCardIcon, ListMagnifyingGlassIcon, ShieldCheckIcon, SlidersHorizontalIcon,
} from "@phosphor-icons/react";
import { Brand } from "@nicepatrol/ui";

const navItems = [
  { to: "/overview", label: "Overview", icon: HouseIcon },
  { to: "/patrols", label: "Patrols", icon: ShieldCheckIcon },
  { to: "/attendance", label: "Attendance", icon: CalendarCheckIcon },
  { to: "/visitors", label: "Visitors", icon: IdentificationCardIcon },
  { to: "/reports", label: "Reports", icon: ChartLineUpIcon },
  { to: "/configuration", label: "Configuration", icon: GearSixIcon },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const [mobileNav, setMobileNav] = useState(false);
  return (
    <div className="min-h-screen bg-[var(--np-canvas)] text-sm">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] flex-col border-r border-[var(--np-line)] bg-white lg:flex">
        <div className="flex h-17 items-center border-b border-[var(--np-line)] px-5"><Brand /></div>
        <div className="px-4 py-4"><div className="rounded-[12px] bg-[var(--np-brand-soft)] px-3 py-2.5 ring-1 ring-inset ring-sky-100"><p className="text-xs text-[var(--np-muted)]">Organization</p><p className="mt-0.5 font-medium">PT Siap Nyambi Indonesia</p></div></div>
        <nav className="grid gap-1 px-3">{navItems.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} className={({ isActive }) => `flex h-10 items-center gap-3 rounded-[9px] px-3 font-medium ${isActive ? "bg-[var(--np-ink)] text-white" : "text-[var(--np-muted)] hover:bg-slate-100 hover:text-[var(--np-ink)]"}`}><Icon size={18} weight="fill"/><span>{label}</span></NavLink>)}</nav>
        <div className="mt-auto border-t border-[var(--np-line)] p-3"><div className="flex items-center gap-3 rounded-[10px] px-2 py-2"><span className="grid size-9 place-items-center rounded-full bg-slate-100 font-medium">AH</span><div className="min-w-0 flex-1"><p className="truncate font-medium">Agus Haryanto</p><p className="text-xs text-[var(--np-muted)]">Supervisor</p></div><SlidersHorizontalIcon size={17}/></div></div>
      </aside>
      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-20 flex h-17 items-center justify-between border-b border-[var(--np-line)] bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8"><div className="lg:hidden"><Brand compact /></div><div className="hidden items-center gap-2 text-[var(--np-muted)] lg:flex"><span className="size-2 rounded-full bg-emerald-500"/><span>All systems operational</span></div><div className="flex items-center gap-2"><button className="relative grid size-9 place-items-center rounded-[9px] text-[var(--np-muted)] hover:bg-slate-100" aria-label="Notifications"><AlarmIcon size={19}/><span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-[var(--np-critical)] ring-2 ring-white"/></button><button onClick={() => setMobileNav((open) => !open)} className="grid size-9 place-items-center rounded-[9px] text-[var(--np-muted)] hover:bg-slate-100 lg:hidden" aria-label="Open navigation"><ListMagnifyingGlassIcon size={20}/></button><span className="hidden h-8 w-px bg-[var(--np-line)] sm:block"/><div className="hidden items-center gap-2 sm:flex"><span className="grid size-8 place-items-center rounded-full bg-[var(--np-brand)] text-xs font-medium text-white">AH</span><span className="font-medium">Agus</span></div></div></header>
        {mobileNav && <nav className="sticky top-17 z-10 flex gap-1 overflow-x-auto border-b border-[var(--np-line)] bg-white px-3 py-2 lg:hidden">{navItems.map(({ to, label }) => <NavLink key={to} to={to} onClick={() => setMobileNav(false)} className={({ isActive }) => `whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${isActive ? "bg-[var(--np-ink)] text-white" : "bg-slate-100"}`}>{label}</NavLink>)}</nav>}
        <main className="mx-auto max-w-[1540px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
