import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import GenerateQR from "./pages/GenerateQR";
import ScanQR from "./pages/ScanQR";
import AttendanceReport from "./pages/AttendanceReport";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/faculty/generate-qr" element={<GenerateQR />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/scan-qr" element={<ScanQR />} />
        <Route path="/admin/report" element={<AttendanceReport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
