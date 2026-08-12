import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardShell } from "../components/layout/DashboardShell";
import { OverviewPage } from "../pages/overview/OverviewPage";
import { PatrolsPage } from "../pages/patrols/PatrolsPage";
import { AttendancePage } from "../pages/attendance/AttendancePage";
import { VisitorsPage } from "../pages/visitors/VisitorsPage";
import { ReportsPage } from "../pages/reports/ReportsPage";
import { ConfigurationPage } from "../pages/configuration/ConfigurationPage";

export default function App() {
  return <DashboardShell><Routes><Route path="/" element={<Navigate to="/overview" replace/>}/><Route path="/overview" element={<OverviewPage/>}/><Route path="/patrols" element={<PatrolsPage/>}/><Route path="/attendance" element={<AttendancePage/>}/><Route path="/visitors" element={<VisitorsPage/>}/><Route path="/reports" element={<ReportsPage/>}/><Route path="/configuration" element={<ConfigurationPage/>}/><Route path="*" element={<Navigate to="/overview" replace/>}/></Routes></DashboardShell>;
}
