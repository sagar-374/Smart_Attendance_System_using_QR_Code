import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", {
        username,
        password,
      });

      // ✅ Save token & role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // ✅ Non-blocking success message
      toast.success("Login Successful!");

      const role = res.data.role;

      // ✅ Small delay so toast is visible (optional)
      setTimeout(() => {
        if (role === "ADMIN") {
          navigate("/admin-dashboard");
        } else if (role === "FACULTY") {
          navigate("/faculty-dashboard");
        } else if (role === "STUDENT") {
          navigate("/student-dashboard");
        } else {
          navigate("/");
        }
      }, 800);

    } catch (err) {
      toast.error("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Smart Attendance System</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
