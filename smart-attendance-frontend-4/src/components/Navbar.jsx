import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav style={navStyle}>
      {/* Logo / Title */}
      <h3 style={logoStyle}>Smart Attendance</h3>

      {/* Navigation Links */}
      <div style={menuStyle}>
        {/* ADMIN NAV */}
        {role === "ADMIN" && (
          <>
            <Link style={linkStyle} to="/add-faculty">Add Faculty</Link>
            <Link style={linkStyle} to="/view-faculty">Faculty List</Link>
            <Link style={linkStyle} to="/add-student">Add Student</Link>
            <Link style={linkStyle} to="/view-students">Student List</Link>
            <Link style={linkStyle} to="/attendance-analytics">Attendance Analytics</Link>
            <Link style={linkStyle} to="/attendance-reports">Attendance Reports</Link>
          </>
        )}

        {/* FACULTY NAV */}
        {role === "FACULTY" && (
          <>
            <Link style={linkStyle} to="/faculty-dashboard">Dashboard</Link>
            <Link style={linkStyle} to="/start-lecture">Start Lecture</Link>
          </>
        )}

        {/* STUDENT NAV */}
        {role === "STUDENT" && (
          <Link style={linkStyle} to="/student-dashboard">Dashboard</Link>
        )}

        {/* Logout Button */}
        {role && (
          <button style={logoutBtnStyle} onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

/* ---------- Inline Styles ---------- */

const navStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 30px",
  background: "linear-gradient(90deg, #0f172a, #1e293b)",
  color: "#fff",
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
};

const logoStyle = {
  margin: 0,
  fontWeight: "600",
  letterSpacing: "0.4px",
};

const menuStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const linkStyle = {
  color: "#e5e7eb",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "500",
  padding: "6px 10px",
  borderRadius: "6px",
  transition: "0.3s",
};

const logoutBtnStyle = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "7px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
};

export default Navbar;
