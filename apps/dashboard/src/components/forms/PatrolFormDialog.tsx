import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select } from "@nicepatrol/ui";
import { FormDialog } from "../dialogs/FormDialog";
import { patrolFormSchema, type PatrolFormValues } from "./formSchemas";

const defaults: PatrolFormValues = {
  route: "Patroli Alpha-04",
  officer: "",
  area: "",
  date: "2026-08-12",
  startTime: "13:00",
  checkpointSet: "",
  repeat: "once",
};

type PatrolFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "schedule";
  onSubmit: (values: PatrolFormValues) => void;
};

export function PatrolFormDialog({ open, onOpenChange, mode, onSubmit }: PatrolFormDialogProps) {
  const { control, register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<PatrolFormValues>({
    resolver: zodResolver(patrolFormSchema),
    defaultValues: defaults,
  });

  useEffect(() => { if (open) reset(defaults); }, [open, reset]);

  const submit = handleSubmit((values) => {
    onSubmit(values);
    onOpenChange(false);
  });

  return <FormDialog
    open={open}
    onOpenChange={onOpenChange}
    title={mode === "create" ? "Create patrol" : "Schedule patrol"}
    description="Assign an officer, route, and checkpoint sequence. This prototype stores the result only for the current session."
  >
    <form onSubmit={submit} className="grid gap-5 px-6 py-5">
      <Input label="Patrol name" placeholder="e.g. Patroli Alpha-04" error={errors.route?.message} {...register("route")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Controller name="officer" control={control} render={({ field }) => <Select className="w-full" label="Officer" hideLabel={false} placeholder="Select an officer" value={field.value || null} onValueChange={(value) => field.onChange(value ?? "")} error={errors.officer?.message}>
          <Select.Option value="Rizky Pratama">Rizky Pratama</Select.Option>
          <Select.Option value="Dimas Saputra">Dimas Saputra</Select.Option>
          <Select.Option value="Fajar Nugroho">Fajar Nugroho</Select.Option>
          <Select.Option value="Siti Rahma">Siti Rahma</Select.Option>
        </Select>} />
        <Controller name="area" control={control} render={({ field }) => <Select className="w-full" label="Work area" hideLabel={false} placeholder="Select an area" value={field.value || null} onValueChange={(value) => field.onChange(value ?? "")} error={errors.area?.message}>
          <Select.Option value="Gudang timur">Gudang timur</Select.Option>
          <Select.Option value="Gedung utama">Gedung utama</Select.Option>
          <Select.Option value="Area produksi">Area produksi</Select.Option>
          <Select.Option value="Gerbang utama">Gerbang utama</Select.Option>
        </Select>} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input type="date" label="Patrol date" error={errors.date?.message} {...register("date")} />
        <Input type="time" label="Start time" error={errors.startTime?.message} {...register("startTime")} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Controller name="checkpointSet" control={control} render={({ field }) => <Select className="w-full" label="Checkpoint set" hideLabel={false} placeholder="Select checkpoints" value={field.value || null} onValueChange={(value) => field.onChange(value ?? "")} error={errors.checkpointSet?.message}>
          <Select.Option value="East warehouse · 7 points">East warehouse · 7 points</Select.Option>
          <Select.Option value="Main building · 8 points">Main building · 8 points</Select.Option>
          <Select.Option value="Production floor · 10 points">Production floor · 10 points</Select.Option>
        </Select>} />
        <Controller name="repeat" control={control} render={({ field }) => <Select className="w-full" label="Repeat" hideLabel={false} value={field.value} onValueChange={(value) => field.onChange(value ?? "once")}>
          <Select.Option value="once">Once</Select.Option>
          <Select.Option value="daily">Every day</Select.Option>
          <Select.Option value="weekdays">Weekdays</Select.Option>
        </Select>} />
      </div>
      <div className="flex justify-end gap-2 border-t border-[var(--np-line)] pt-4">
        <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
        <Button type="submit" variant="primary" loading={isSubmitting}>{mode === "create" ? "Create patrol" : "Schedule patrol"}</Button>
      </div>
    </form>
  </FormDialog>;
}
