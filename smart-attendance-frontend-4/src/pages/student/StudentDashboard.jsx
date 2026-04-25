import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  // 🔹 Load logged-in student
  useEffect(() => {
    const storedStudent = localStorage.getItem("student");

    if (!storedStudent) {
      navigate("/student-login");
    } else {
      setStudent(JSON.parse(storedStudent));
    }
  }, [navigate]);

  if (!student) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #020617)",
        padding: "40px",
        color: "#fff"
      }}
    >
      {/* Welcome */}
      <h1 style={{ marginBottom: "10px", fontSize: "32px" }}>
        🎓 Welcome, {student.name}
      </h1>

      <p style={{ marginBottom: "30px", color: "#cbd5f5" }}>
        From here you can scan QR codes and check your attendance anytime.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "25px"
        }}
      >
        {/* Student Info */}
        <div
          style={cardStyle}
          onMouseEnter={hoverIn}
          onMouseLeave={hoverOut}
        >
          <h3 style={{ color: "#a855f7" }}>👤 Student Info</h3>
          <p>Roll No: {student.rollNo}</p>
          <p>Department: {student.department}</p>
        </div>

        {/* Scan QR */}
        <div
          style={cardStyle}
          onMouseEnter={hoverIn}
          onMouseLeave={hoverOut}
          onClick={() => navigate("/scan-qr")}
        >
          <h3 style={{ color: "#22c55e" }}>📷 Scan QR</h3>
          <p>Mark your attendance using QR code</p>
        </div>

        {/* Attendance History */}
        <div
          style={cardStyle}
          onMouseEnter={hoverIn}
          onMouseLeave={hoverOut}
          onClick={() => navigate("/attendance-history")}
        >
          <h3 style={{ color: "#60a5fa" }}>📊 Attendance History</h3>
          <p>View subject-wise attendance</p>
        </div>
      </div>
    </div>
  );
}

/* Hover Functions */
const hoverIn = (e) => {
  e.currentTarget.style.transform = "translateY(-8px) scale(1.03)";
  e.currentTarget.style.boxShadow =
    "0 20px 40px rgba(0,0,0,0.8)";
};

const hoverOut = (e) => {
  e.currentTarget.style.transform = "translateY(0) scale(1)";
  e.currentTarget.style.boxShadow =
    "0 10px 25px rgba(0,0,0,0.6)";
};

/* Card Base Style */
const cardStyle = {
  width: "100%",
  padding: "18px",
  borderRadius: "16px",
  background: "rgba(255, 255, 255, 0.08)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

export default StudentDashboard;
