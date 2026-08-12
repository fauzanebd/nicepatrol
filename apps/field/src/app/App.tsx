import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { FieldStateProvider } from "./FieldState";
import { BottomNav } from "../components/layout/BottomNav";
import { HomePage } from "../pages/home/HomePage";
import { PatrolPage } from "../pages/patrol/PatrolPage";
import { ScannerPage } from "../pages/scanner/ScannerPage";
import { AttendancePage } from "../pages/attendance/AttendancePage";
import { IncidentPage } from "../pages/incidents/IncidentPage";
import { ProfilePage } from "../pages/profile/ProfilePage";

function FieldAppRoutes(){const location=useLocation();const hideNav=["/scanner","/incidents/new"].includes(location.pathname);return <div className="np-ops-grid min-h-screen bg-[var(--np-night)] sm:px-5 sm:py-5"><div className="relative mx-auto min-h-[100dvh] max-w-[480px] overflow-hidden bg-[var(--np-canvas)] shadow-2xl sm:min-h-[calc(100vh-40px)] sm:rounded-[24px]"><Routes><Route path="/" element={<HomePage/>}/><Route path="/patrol" element={<PatrolPage/>}/><Route path="/scanner" element={<ScannerPage/>}/><Route path="/attendance" element={<AttendancePage/>}/><Route path="/incidents/new" element={<IncidentPage/>}/><Route path="/profile" element={<ProfilePage/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes>{!hideNav&&<BottomNav/>}</div></div>}
export default function App(){return <FieldStateProvider><FieldAppRoutes/></FieldStateProvider>}
