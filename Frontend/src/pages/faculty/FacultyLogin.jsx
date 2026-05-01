import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";
import "./FacultyLogin.css";

function FacultyLogin() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/faculty/login", {
        mobile: phone,
        password: password,
      });

      // ✅ SAVE JWT TOKEN
      localStorage.setItem("token", response.data.token);

      // ✅ SAVE ROLE (explicit)
      localStorage.setItem("role", "FACULTY");

      // ✅ SAVE FACULTY DETAILS
      localStorage.setItem(
        "faculty",
        JSON.stringify(response.data.faculty)
      );

      // ✅ NON-BLOCKING SUCCESS MESSAGE
      toast.success("Faculty login successful!");

      // ✅ AUTO REDIRECT
      setTimeout(() => {
        navigate("/faculty-dashboard");
      }, 800);

    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Invalid mobile number or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h2>Faculty Login</h2>

        <form onSubmit={handleLogin}>
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FacultyLogin;
