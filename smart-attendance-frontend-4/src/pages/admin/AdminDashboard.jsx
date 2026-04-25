import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h1 style={headerStyle}>Admin Control Panel</h1>

        <p style={subTextStyle}>
          Welcome to the administration dashboard. Manage faculty and student
          records, monitor attendance data, and keep the system organized.
        </p>

        <p style={hintTextStyle}>Select an option below to continue</p>

        <div style={gridStyle}>
          {/* Add Faculty */}
          <div
            style={cardStyle}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
            onClick={() => navigate("/add-faculty")}
          >
            <span style={iconStyle}>➕</span>
            <h3 style={cardTitle}>Add Faculty</h3>
            <p style={cardText}>Create and manage faculty profiles</p>
          </div>

          {/* Faculty List */}
          <div
            style={cardStyle}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
            onClick={() => navigate("/view-faculty")}
          >
            <span style={iconStyle}>👩‍🏫</span>
            <h3 style={cardTitle}>Faculty List</h3>
            <p style={cardText}>View, update, or remove faculty records</p>
          </div>

          {/* Add Student */}
          <div
            style={cardStyle}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
            onClick={() => navigate("/add-student")}
          >
            <span style={iconStyle}>➕</span>
            <h3 style={cardTitle}>Add Student</h3>
            <p style={cardText}>Register new students into the system</p>
          </div>

          {/* Student List */}
          <div
            style={cardStyle}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
            onClick={() => navigate("/view-students")}
          >
            <span style={iconStyle}>🎓</span>
            <h3 style={cardTitle}>Student List</h3>
            <p style={cardText}>Access and manage student information</p>
          </div>

          {/* Attendance Analytics */}
          <div
            style={cardStyle}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
            onClick={() => navigate("/attendance-analytics")}
          >
            <span style={iconStyle}>📊</span>
            <h3 style={cardTitle}>Attendance Analytics</h3>
            <p style={cardText}>Visual attendance insights & trends</p>
          </div>

          {/* Attendance Reports */}
          <div
            style={cardStyle}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
            onClick={() => navigate("/attendance-reports")}
          >
            <span style={iconStyle}>📄</span>
            <h3 style={cardTitle}>Attendance Reports</h3>
            <p style={cardText}>Student-wise attendance reports</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Hover Effects ---------- */
const hoverIn = (e) => {
  e.currentTarget.style.transform = "translateY(-8px) scale(1.03)";
  e.currentTarget.style.boxShadow = "0 20px 40px rgba(59, 130, 246, 0.4)";
};

const hoverOut = (e) => {
  e.currentTarget.style.transform = "translateY(0) scale(1)";
  e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.6)";
};

/* ---------- Styles ---------- */
const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #0f172a, #020617)",
  color: "#e5e7eb",
};

const containerStyle = {
  width: "100%",
  maxWidth: "1000px",
  textAlign: "center",
  padding: "40px 20px",
};

const headerStyle = {
  marginBottom: "10px",
  fontSize: "32px",
  letterSpacing: "1px",
};

const subTextStyle = {
  maxWidth: "700px",
  margin: "0 auto 10px",
  fontSize: "16px",
  color: "#cbd5f5",
  lineHeight: "1.6",
};

const hintTextStyle = {
  marginBottom: "40px",
  fontSize: "14px",
  color: "#94a3b8",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "25px",
  justifyItems: "center", // ✅ Centers all cards horizontally
};

const cardStyle = {
  background: "rgba(30, 41, 59, 0.9)",
  padding: "25px",
  borderRadius: "16px",
  cursor: "pointer",
  boxShadow: "0 15px 30px rgba(0,0,0,0.6)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",

  /* ✅ Center content inside card */
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  minHeight: "200px",
  width: "100%",
  maxWidth: "260px",
};

const iconStyle = {
  fontSize: "40px",
  display: "block",
  marginBottom: "12px",
};

const cardTitle = {
  fontSize: "18px",
  fontWeight: "600",
  marginBottom: "6px",
};

const cardText = {
  fontSize: "14px",
  color: "#cbd5f5",
  lineHeight: "1.5",
};

export default AdminDashboard;
