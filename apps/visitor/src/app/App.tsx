import { Navigate, Route, Routes } from "react-router-dom";
import { VisitorLayout } from "../components/layout/VisitorLayout";
import { RegisterPage } from "../pages/register/RegisterPage";
import { VisitorListPage } from "../pages/visitors/VisitorListPage";
export default function App(){return <Routes><Route element={<VisitorLayout/>}><Route path="/" element={<Navigate to="/register" replace/>}/><Route path="/register" element={<RegisterPage/>}/><Route path="/active" element={<VisitorListPage mode="active"/>}/><Route path="/history" element={<VisitorListPage mode="history"/>}/><Route path="*" element={<Navigate to="/register" replace/>}/></Route></Routes>}
