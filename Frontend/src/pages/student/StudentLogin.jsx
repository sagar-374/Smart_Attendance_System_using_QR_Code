import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";

function StudentLogin() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/student/login", {
        mobile,
        password,
      });

      // ✅ SAVE JWT & ROLE
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "STUDENT");
      localStorage.setItem("student", JSON.stringify(res.data.student));

      // ✅ NON-BLOCKING SUCCESS MESSAGE
      toast.success("Student login successful!");

      // ✅ AUTO REDIRECT
      setTimeout(() => {
        navigate("/student-dashboard");
      }, 800);

    } catch (error) {
      console.error(error);
      toast.error("Invalid mobile or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Student Login</h2>

        <form onSubmit={handleLogin} style={formStyle}>
          <input
            style={inputStyle}
            type="text"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />

          <input
            style={inputStyle}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button style={buttonStyle} type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------- Inline Styles ---------- */

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #0f172a, #1e293b)",
};

const cardStyle = {
  width: "90%",
  maxWidth: "380px",
  padding: "30px",
  borderRadius: "16px",
  background: "#121212",
  backdropFilter: "blur(12px)",
  boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
  textAlign: "center",
  color: "white",
};

const titleStyle = {
  marginBottom: "22px",
  fontWeight: "600",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const inputStyle = {
  padding: "10px 12px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  fontSize: "14px",
};

const buttonStyle = {
  marginTop: "10px",
  padding: "11px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "500",
  background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
  color: "white",
};

export default StudentLogin;
