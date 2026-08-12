import { patrols, personnel, seedVisitors, visitorSchema, type Visitor } from "@nicepatrol/domain";

const wait = (duration = 260) => new Promise((resolve) => setTimeout(resolve, duration));

const visitorStorageKey = "nicepatrol.visitors";

function readVisitors(): Visitor[] {
  if (typeof localStorage === "undefined") return seedVisitors;
  const stored = localStorage.getItem(visitorStorageKey);
  if (!stored) return seedVisitors;
  const parsed = visitorSchema.array().safeParse(JSON.parse(stored));
  return parsed.success ? parsed.data : seedVisitors;
}

function writeVisitors(visitors: Visitor[]) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(visitorStorageKey, JSON.stringify(visitors));
  }
}

export const mockApi = {
  async getPatrols() {
    await wait();
    return patrols;
  },
  async getPersonnel() {
    await wait();
    return personnel;
  },
  async getVisitors() {
    await wait();
    return readVisitors();
  },
  async createVisitor(input: Omit<Visitor, "id" | "checkedInAt" | "status">) {
    await wait(420);
    const visitor = visitorSchema.parse({
      ...input,
      id: `VST-${1050 + readVisitors().length}`,
      checkedInAt: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      status: "Active",
    });
    const visitors = [visitor, ...readVisitors()];
    writeVisitors(visitors);
    return visitor;
  },
  async checkoutVisitor(id: string) {
    await wait(300);
    const visitors = readVisitors().map((visitor) => visitor.id === id ? { ...visitor, status: "Checked out" as const } : visitor);
    writeVisitors(visitors);
    return visitors.find((visitor) => visitor.id === id);
  },
};
