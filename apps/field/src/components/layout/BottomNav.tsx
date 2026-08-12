import { NavLink } from "react-router-dom";
import { ClockIcon, HouseIcon, NavigationArrowIcon, UserCircleIcon } from "@phosphor-icons/react";

const items = [
  { to: "/", label: "Home", icon: HouseIcon },
  { to: "/patrol", label: "Patrol", icon: NavigationArrowIcon },
  { to: "/attendance", label: "Attendance", icon: ClockIcon },
  { to: "/profile", label: "Profile", icon: UserCircleIcon },
];

export function BottomNav() {
  return <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto flex max-w-[480px] border-t border-[var(--np-line)] bg-white px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_30px_rgba(18,39,52,.08)]">
    {items.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) => `grid flex-1 place-items-center gap-1 rounded-[10px] py-1.5 text-[10px] font-medium ${isActive ? "text-[var(--np-brand)]" : "text-[var(--np-muted)]"}`}><Icon size={21} />{label}</NavLink>)}
  </nav>;
}
