import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";

// Home
import Home from "./pages/Home";

// Admin
import Login from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddFaculty from "./pages/admin/AddFaculty";
import ViewFaculty from "./pages/admin/ViewFaculty";
import AddStudent from "./pages/admin/AddStudent";
import ViewStudents from "./pages/admin/ViewStudents";
import AttendanceAnalytics from "./pages/admin/AttendanceAnalytics";
import AttendanceReports from "./pages/admin/AttendanceReports";

// Faculty
import FacultyLogin from "./pages/faculty/FacultyLogin";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import StartLecture from "./pages/faculty/StartLecture";
import LectureQR from "./pages/faculty/LectureQR";
import ViewAttendance from "./pages/faculty/ViewAttendance";
import ViewLectures from "./pages/faculty/ViewLecture";

// Student
import StudentLogin from "./pages/student/StudentLogin";
import StudentDashboard from "./pages/student/StudentDashboard";
import ScanQR from "./pages/student/ScanQR";
import AttendanceHistory from "./pages/student/AttendanceHistory";

function AppLayout() {
  const location = useLocation();

  const hideNavbarRoutes = [
    "/",
    "/admin-login",
    "/faculty-login",
    "/student-login",
  ];

  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* ✅ Toast works globally */}
      <ToastContainer position="top-right" autoClose={2000} />

      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Admin */}
        <Route path="/admin-login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-faculty" element={<AddFaculty />} />
        <Route path="/view-faculty" element={<ViewFaculty />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/view-students" element={<ViewStudents />} />
        <Route path="/attendance-analytics" element={<AttendanceAnalytics />} />
        <Route path="/attendance-reports" element={<AttendanceReports />} />

        {/* Faculty */}
        <Route path="/faculty-login" element={<FacultyLogin />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/start-lecture" element={<StartLecture />} />
        <Route path="/lecture-qr/:lectureId" element={<LectureQR />} />
        <Route path="/view-lectures" element={<ViewLectures />} />
        <Route
          path="/view-attendance/:lectureId?"
          element={<ViewAttendance />}
        />

        {/* Student */}
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/scan-qr" element={<ScanQR />} />
        <Route
          path="/attendance-history"
          element={<AttendanceHistory />}
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
