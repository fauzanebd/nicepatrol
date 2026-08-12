import { CheckCircleIcon, XIcon } from "@phosphor-icons/react";

export function ActionNotice({ message, onDismiss }: { message: string | null; onDismiss: () => void }) {
  if (!message) return null;
  return <div role="status" className="flex items-start gap-3 rounded-[12px] bg-emerald-50 px-4 py-3 text-emerald-900 ring-1 ring-inset ring-emerald-200">
    <span className="h-lh flex items-center"><CheckCircleIcon size={18} weight="fill" /></span>
    <p className="flex-1">{message}</p>
    <button type="button" onClick={onDismiss} aria-label="Dismiss notification" className="h-lh flex items-center text-emerald-700 hover:text-emerald-950"><XIcon size={16} /></button>
  </div>;
}
