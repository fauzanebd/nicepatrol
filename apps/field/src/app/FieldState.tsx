import { createContext, useContext, useState, type ReactNode } from "react";
import { checkpoints as initialCheckpoints, type Checkpoint } from "@nicepatrol/domain";

type FieldStateValue = {
  route: Checkpoint[];
  currentCheckpoint?: Checkpoint;
  completeCurrentCheckpoint: () => void;
  checkedIn: boolean;
  toggleAttendance: () => void;
};

const FieldStateContext = createContext<FieldStateValue | null>(null);

export function FieldStateProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Checkpoint[]>(initialCheckpoints);
  const [checkedIn, setCheckedIn] = useState(true);
  const currentCheckpoint = route.find((item) => item.status === "current");
  const completeCurrentCheckpoint = () => {
    if (!currentCheckpoint) return;
    const index = route.findIndex((item) => item.id === currentCheckpoint.id);
    setRoute(route.map((item, itemIndex) => itemIndex === index ? { ...item, status:"complete", time:new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"}) } : itemIndex === index+1 ? { ...item, status:"current" } : item));
  };
  return <FieldStateContext.Provider value={{route,currentCheckpoint,completeCurrentCheckpoint,checkedIn,toggleAttendance:()=>setCheckedIn((value)=>!value)}}>{children}</FieldStateContext.Provider>;
}

export function useFieldState() {
  const value = useContext(FieldStateContext);
  if (!value) throw new Error("useFieldState must be used inside FieldStateProvider");
  return value;
}
