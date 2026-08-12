import { z } from "zod";

export const patrolFormSchema = z.object({
  route: z.string().min(3, "Enter a patrol name"),
  officer: z.string().min(1, "Select an officer"),
  area: z.string().min(1, "Select an area"),
  date: z.string().min(1, "Select a patrol date"),
  startTime: z.string().min(1, "Select a start time"),
  checkpointSet: z.string().min(1, "Select a checkpoint set"),
  repeat: z.enum(["once", "daily", "weekdays"]),
});

export const checkpointFormSchema = z.object({
  name: z.string().min(3, "Enter a checkpoint name"),
  area: z.string().min(1, "Select an area"),
  scanType: z.enum(["qr", "nfc"]),
  evidence: z.enum(["none", "photo", "note"]),
});

export const shiftFormSchema = z.object({
  name: z.string().min(3, "Enter a shift name"),
  officer: z.string().min(1, "Select an officer"),
  area: z.string().min(1, "Select an area"),
  date: z.string().min(1, "Select a shift date"),
  startsAt: z.string().min(1, "Select a start time"),
  endsAt: z.string().min(1, "Select an end time"),
}).refine((values) => values.startsAt !== values.endsAt, { path: ["endsAt"], message: "End time must differ from start time" });

export const visitorFormSchema = z.object({
  name: z.string().min(2, "Enter the visitor's full name"),
  company: z.string().min(2, "Enter a company or organization"),
  phone: z.string().min(8, "Enter a valid phone number"),
  host: z.string().min(1, "Select a host"),
  purpose: z.string().min(3, "Enter a visit purpose"),
  entrance: z.string().min(1, "Select an entrance"),
  badge: z.string().min(2, "Enter a badge number"),
});

export type PatrolFormValues = z.infer<typeof patrolFormSchema>;
export type CheckpointFormValues = z.infer<typeof checkpointFormSchema>;
export type ShiftFormValues = z.infer<typeof shiftFormSchema>;
export type VisitorFormValues = z.infer<typeof visitorFormSchema>;
