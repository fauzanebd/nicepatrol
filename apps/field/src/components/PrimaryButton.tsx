import type { ComponentType, ReactNode } from "react";
export function PrimaryButton({ children, icon:Icon, onClick, dark=false, disabled=false }: { children:ReactNode; icon?:ComponentType<{size?:number;weight?:"regular"|"fill"}>; onClick?:()=>void; dark?:boolean; disabled?:boolean }) {
  return <button disabled={disabled} onClick={onClick} className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-[12px] px-4 font-medium disabled:cursor-not-allowed disabled:opacity-50 ${dark ? "bg-[var(--np-night)] text-white hover:bg-[var(--np-night-soft)]" : "bg-[var(--np-brand)] text-white hover:bg-[var(--np-brand-strong)]"}`}>{Icon&&<Icon size={19} weight="fill"/>}{children}</button>;
}
