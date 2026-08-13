import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Checkpoint } from "@nicepatrol/domain";
import { Button, Input, Select, StatusBadge } from "@nicepatrol/ui";
import { FormDialog } from "../dialogs/FormDialog";
import { checkpointFormSchema, type CheckpointFormValues } from "./formSchemas";

const defaults: CheckpointFormValues = { name: "", area: "", scanType: "qr", evidence: "photo" };

export function CheckpointFormDialog({ open, onOpenChange, checkpoints, onSubmit }: { open: boolean; onOpenChange: (open: boolean) => void; checkpoints: Checkpoint[]; onSubmit: (values: CheckpointFormValues) => void }) {
  const { control, register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CheckpointFormValues>({ resolver: zodResolver(checkpointFormSchema), defaultValues: defaults });
  useEffect(() => { if (open) reset(defaults); }, [open, reset]);
  const submit = handleSubmit((values) => { onSubmit(values); reset(defaults); });

  return <FormDialog open={open} onOpenChange={onOpenChange} title="Manage checkpoints" description="Review the active checkpoint set and add another QR or NFC verification point.">
    <div className="grid gap-5 px-6 py-5">
      <div className="overflow-hidden rounded-[12px] ring-1 ring-inset ring-[var(--np-line)]">
        <div className="flex items-center justify-between bg-slate-50 px-4 py-3"><p className="font-medium">East warehouse set</p><span className="text-xs text-[var(--np-muted)]">{checkpoints.length} checkpoints</span></div>
        <div className="np-scrollbar max-h-40 divide-y divide-[var(--np-line)] overflow-y-auto">
          {checkpoints.map((checkpoint) => <div key={checkpoint.id} className="flex items-center gap-3 px-4 py-2.5"><span className="font-mono text-[11px] text-[var(--np-muted)]">{checkpoint.id}</span><p className="flex-1">{checkpoint.name}</p><StatusBadge tone={checkpoint.status === "complete" ? "success" : checkpoint.status === "current" ? "live" : "neutral"}>{checkpoint.status}</StatusBadge></div>)}
        </div>
      </div>
      <form onSubmit={submit} className="grid gap-4">
        <div className="grid gap-1"><h3 className="text-base font-semibold">Add checkpoint</h3><p className="text-xs text-[var(--np-muted)]">New checkpoints are appended to the current set.</p></div>
        <Input label="Checkpoint name" placeholder="e.g. Server room entrance" error={errors.name?.message} {...register("name")} />
        <Controller name="area" control={control} render={({ field }) => <Select className="w-full" label="Work area" hideLabel={false} placeholder="Select an area" value={field.value || null} onValueChange={(value) => field.onChange(value ?? "")} error={errors.area?.message}>
          <Select.Option value="Gudang timur">Gudang timur</Select.Option><Select.Option value="Gedung utama">Gedung utama</Select.Option><Select.Option value="Area produksi">Area produksi</Select.Option><Select.Option value="Gerbang utama">Gerbang utama</Select.Option>
        </Select>} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Controller name="scanType" control={control} render={({ field }) => <Select className="w-full" label="Verification method" hideLabel={false} value={field.value} onValueChange={(value) => field.onChange(value ?? "qr")}><Select.Option value="qr">QR code</Select.Option><Select.Option value="nfc">NFC tag</Select.Option></Select>} />
          <Controller name="evidence" control={control} render={({ field }) => <Select className="w-full" label="Required evidence" hideLabel={false} value={field.value} onValueChange={(value) => field.onChange(value ?? "none")}><Select.Option value="none">None</Select.Option><Select.Option value="photo">Photo</Select.Option><Select.Option value="note">Officer note</Select.Option></Select>} />
        </div>
        <div className="flex justify-end gap-2 border-t border-[var(--np-line)] pt-4"><Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>Done</Button><Button type="submit" variant="primary" loading={isSubmitting}>Add checkpoint</Button></div>
      </form>
    </div>
  </FormDialog>;
}
