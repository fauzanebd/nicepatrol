import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select } from "@nicepatrol/ui";
import { FormDialog } from "../dialogs/FormDialog";
import { shiftFormSchema, type ShiftFormValues } from "./formSchemas";

const defaults: ShiftFormValues = { name: "Shift siang", officer: "", area: "", date: "2026-08-13", startsAt: "14:00", endsAt: "22:00" };

export function ShiftFormDialog({ open, onOpenChange, onSubmit }: { open: boolean; onOpenChange: (open: boolean) => void; onSubmit: (values: ShiftFormValues) => void }) {
  const { control, register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ShiftFormValues>({ resolver: zodResolver(shiftFormSchema), defaultValues: defaults });
  useEffect(() => { if (open) reset(defaults); }, [open, reset]);
  const submit = handleSubmit((values) => { onSubmit(values); onOpenChange(false); });

  return <FormDialog open={open} onOpenChange={onOpenChange} title="Manage shifts" description="Create a shift assignment for one security officer. Existing assignments are unchanged in this prototype.">
    <form onSubmit={submit} className="grid gap-5 px-6 py-5">
      <Input label="Shift name" placeholder="e.g. Shift siang" error={errors.name?.message} {...register("name")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Controller name="officer" control={control} render={({ field }) => <Select label="Officer" hideLabel={false} placeholder="Select an officer" value={field.value || null} onValueChange={(value) => field.onChange(value ?? "")} error={errors.officer?.message}>
          <Select.Option value="Rizky Pratama">Rizky Pratama</Select.Option><Select.Option value="Dimas Saputra">Dimas Saputra</Select.Option><Select.Option value="Fajar Nugroho">Fajar Nugroho</Select.Option><Select.Option value="Siti Rahma">Siti Rahma</Select.Option>
        </Select>} />
        <Controller name="area" control={control} render={({ field }) => <Select label="Work area" hideLabel={false} placeholder="Select an area" value={field.value || null} onValueChange={(value) => field.onChange(value ?? "")} error={errors.area?.message}>
          <Select.Option value="Gudang timur">Gudang timur</Select.Option><Select.Option value="Gedung utama">Gedung utama</Select.Option><Select.Option value="Area produksi">Area produksi</Select.Option><Select.Option value="Gerbang utama">Gerbang utama</Select.Option>
        </Select>} />
      </div>
      <Input type="date" label="Shift date" error={errors.date?.message} {...register("date")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input type="time" label="Starts at" error={errors.startsAt?.message} {...register("startsAt")} />
        <Input type="time" label="Ends at" error={errors.endsAt?.message} {...register("endsAt")} />
      </div>
      <div className="flex justify-end gap-2 border-t border-[var(--np-line)] pt-4"><Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button><Button type="submit" variant="primary" loading={isSubmitting}>Save shift</Button></div>
    </form>
  </FormDialog>;
}
