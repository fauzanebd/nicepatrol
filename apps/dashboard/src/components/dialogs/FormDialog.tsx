import type { ReactNode } from "react";
import { XIcon } from "@phosphor-icons/react";
import { Dialog } from "@nicepatrol/ui";

type FormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: ReactNode;
  size?: "base" | "lg";
};

export function FormDialog({ open, onOpenChange, title, description, children, size = "lg" }: FormDialogProps) {
  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog size={size} className="max-h-[min(760px,calc(100dvh-32px))] w-[calc(100vw-32px)] max-w-2xl overflow-y-auto p-0">
      <div className="sticky top-0 z-10 flex items-start justify-between gap-5 border-b border-[var(--np-line)] bg-white px-6 py-5">
        <div className="grid gap-1.5">
          <Dialog.Title className="text-xl font-semibold">{title}</Dialog.Title>
          <Dialog.Description className="max-w-xl text-[var(--np-muted)]">{description}</Dialog.Description>
        </div>
        <Dialog.Close aria-label="Close dialog" className="grid size-9 shrink-0 place-items-center rounded-[9px] text-[var(--np-muted)] ring-1 ring-inset ring-[var(--np-line)] hover:bg-slate-50 hover:text-[var(--np-ink)]">
          <XIcon size={17} />
        </Dialog.Close>
      </div>
      {children}
    </Dialog>
  </Dialog.Root>;
}
