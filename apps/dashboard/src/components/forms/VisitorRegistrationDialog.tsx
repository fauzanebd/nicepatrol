import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, Textarea } from "@nicepatrol/ui";
import { FormDialog } from "../dialogs/FormDialog";
import { visitorFormSchema, type VisitorFormValues } from "./formSchemas";

const defaults: VisitorFormValues = { name: "", company: "", phone: "", host: "", purpose: "", entrance: "Main entrance", badge: "B-018" };

export function VisitorRegistrationDialog({ open, onOpenChange, onSubmit }: { open: boolean; onOpenChange: (open: boolean) => void; onSubmit: (values: VisitorFormValues) => void }) {
  const { control, register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<VisitorFormValues>({ resolver: zodResolver(visitorFormSchema), defaultValues: defaults });
  useEffect(() => { if (open) reset(defaults); }, [open, reset]);
  const submit = handleSubmit((values) => { onSubmit(values); onOpenChange(false); });

  return <FormDialog open={open} onOpenChange={onOpenChange} title="Register visitor" description="Record visitor identity, host, and access details before issuing a badge.">
    <form onSubmit={submit} className="grid gap-5 px-6 py-5">
      <div className="grid gap-4 sm:grid-cols-2"><Input label="Visitor name" placeholder="Full name" error={errors.name?.message} {...register("name")} /><Input label="Company" placeholder="Company or organization" error={errors.company?.message} {...register("company")} /></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Phone number" placeholder="08xx xxxx xxxx" error={errors.phone?.message} {...register("phone")} />
        <Controller name="host" control={control} render={({ field }) => <Select className="w-full" label="Person to visit" hideLabel={false} placeholder="Select a host" value={field.value || null} onValueChange={(value) => field.onChange(value ?? "")} error={errors.host?.message}><Select.Option value="Budi Santoso">Budi Santoso</Select.Option><Select.Option value="Rina Kartika">Rina Kartika</Select.Option><Select.Option value="Agus Haryanto">Agus Haryanto</Select.Option></Select>} />
      </div>
      <Textarea label="Visit purpose" placeholder="Describe the reason for this visit" error={errors.purpose?.message} {...register("purpose")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Controller name="entrance" control={control} render={({ field }) => <Select className="w-full" label="Entrance" hideLabel={false} value={field.value} onValueChange={(value) => field.onChange(value ?? "Main entrance")}><Select.Option value="Main entrance">Main entrance</Select.Option><Select.Option value="East entrance">East entrance</Select.Option><Select.Option value="Loading entrance">Loading entrance</Select.Option></Select>} />
        <Input label="Badge number" error={errors.badge?.message} {...register("badge")} />
      </div>
      <div className="flex justify-end gap-2 border-t border-[var(--np-line)] pt-4"><Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button><Button type="submit" variant="primary" loading={isSubmitting}>Register visitor</Button></div>
    </form>
  </FormDialog>;
}
