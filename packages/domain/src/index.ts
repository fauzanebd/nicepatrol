import { z } from "zod";

export const statusSchema = z.enum(["active", "complete", "warning", "critical", "scheduled"]);

export const personnelSchema = z.object({
  id: z.string(),
  name: z.string(),
  initials: z.string(),
  role: z.enum(["Security officer", "Supervisor", "Admin"]),
  shift: z.string(),
  area: z.string(),
  status: z.enum(["On duty", "Patrolling", "Break", "Off duty", "Late"]),
  time: z.string(),
});

export const checkpointSchema = z.object({
  id: z.string(),
  name: z.string(),
  area: z.string(),
  status: z.enum(["complete", "current", "pending", "missed"]),
  time: z.string().optional(),
});

export const patrolSchema = z.object({
  id: z.string(),
  officer: z.string(),
  route: z.string(),
  area: z.string(),
  progress: z.number().min(0).max(100),
  checkpoints: z.string(),
  status: statusSchema,
  startedAt: z.string(),
  nextCheckpoint: z.string(),
});

export const visitorSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Enter the visitor's full name"),
  company: z.string().min(2, "Enter a company or organization"),
  phone: z.string().min(8, "Enter a valid phone number"),
  host: z.string().min(2, "Select a host"),
  purpose: z.string().min(3, "Enter a visit purpose"),
  badge: z.string(),
  checkedInAt: z.string(),
  status: z.enum(["Active", "Checked out"]),
});

export const incidentSchema = z.object({
  category: z.string().min(1, "Select a category"),
  severity: z.enum(["Low", "Medium", "High", "Critical"]),
  description: z.string().min(10, "Add at least 10 characters"),
  location: z.string().min(2),
});

export type Personnel = z.infer<typeof personnelSchema>;
export type Checkpoint = z.infer<typeof checkpointSchema>;
export type Patrol = z.infer<typeof patrolSchema>;
export type Visitor = z.infer<typeof visitorSchema>;
export type IncidentInput = z.infer<typeof incidentSchema>;

export const personnel: Personnel[] = personnelSchema.array().parse([
  { id: "EMP-018", name: "Rizky Pratama", initials: "RP", role: "Security officer", shift: "Shift pagi", area: "Gudang timur", status: "Patrolling", time: "07:02" },
  { id: "EMP-007", name: "Dimas Saputra", initials: "DS", role: "Security officer", shift: "Shift pagi", area: "Gedung utama", status: "On duty", time: "06:58" },
  { id: "EMP-023", name: "Fajar Nugroho", initials: "FN", role: "Security officer", shift: "Shift pagi", area: "Area produksi", status: "Break", time: "07:06" },
  { id: "EMP-031", name: "Siti Rahma", initials: "SR", role: "Security officer", shift: "Shift pagi", area: "Gerbang utama", status: "Late", time: "07:18" },
  { id: "EMP-002", name: "Agus Haryanto", initials: "AH", role: "Supervisor", shift: "Shift pagi", area: "Semua area", status: "On duty", time: "06:47" },
]);

export const patrols: Patrol[] = patrolSchema.array().parse([
  { id: "PTR-2408-03", officer: "Rizky Pratama", route: "Patroli Alpha-03", area: "Gudang timur", progress: 57, checkpoints: "4 / 7", status: "active", startedAt: "09:29", nextCheckpoint: "Ruang generator" },
  { id: "PTR-2408-02", officer: "Dimas Saputra", route: "Patroli Alpha-02", area: "Gedung utama", progress: 86, checkpoints: "6 / 7", status: "warning", startedAt: "08:31", nextCheckpoint: "Lobi selatan" },
  { id: "PTR-2408-01", officer: "Fajar Nugroho", route: "Patroli Alpha-01", area: "Area produksi", progress: 100, checkpoints: "8 / 8", status: "complete", startedAt: "07:10", nextCheckpoint: "Selesai" },
]);

export const checkpoints: Checkpoint[] = checkpointSchema.array().parse([
  { id: "CP-01", name: "Gerbang timur", area: "Gudang timur", status: "complete", time: "09:31" },
  { id: "CP-02", name: "Loading dock", area: "Gudang timur", status: "complete", time: "09:36" },
  { id: "CP-03", name: "Pintu darurat", area: "Gudang timur", status: "complete", time: "09:42" },
  { id: "CP-04", name: "Koridor penyimpanan", area: "Gudang timur", status: "complete", time: "09:48" },
  { id: "CP-05", name: "Ruang generator", area: "Gudang timur", status: "current" },
  { id: "CP-06", name: "Tangki air", area: "Gudang timur", status: "pending" },
  { id: "CP-07", name: "Gerbang selatan", area: "Gudang timur", status: "pending" },
]);

export const seedVisitors: Visitor[] = visitorSchema.array().parse([
  { id: "VST-1048", name: "Nadia Putri", company: "PT Sinar Logistik", phone: "081298765411", host: "Budi Santoso", purpose: "Koordinasi pengiriman", badge: "B-014", checkedInAt: "08:42", status: "Active" },
  { id: "VST-1047", name: "Bambang Wijaya", company: "CV Teknik Prima", phone: "081377125900", host: "Rina Kartika", purpose: "Pemeliharaan mesin", badge: "B-011", checkedInAt: "08:15", status: "Active" },
  { id: "VST-1044", name: "Maya Lestari", company: "PT Bumi Konsultan", phone: "082112240888", host: "Agus Haryanto", purpose: "Audit keselamatan", badge: "B-006", checkedInAt: "07:38", status: "Active" },
]);
