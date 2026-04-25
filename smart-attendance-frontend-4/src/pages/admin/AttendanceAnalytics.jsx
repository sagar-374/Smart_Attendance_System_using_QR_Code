import { useEffect, useState } from "react";
import api from "../../api/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function AttendanceAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/api/attendance/analytics")
      .then((res) => setAnalytics(res.data))
      .catch(() => setError("Failed to load analytics"));
  }, []);

  if (error) return <div style={styles.center}>{error}</div>;
  if (!analytics) return <div style={styles.center}>Loading Analytics...</div>;

  const studentAttendance = (analytics.studentAttendance || []).map((s) => ({
    name: s.name,
    attendance: Number(s.attendance),
  }));

  const topDefaulters = (analytics.topDefaulters || [])
    .slice(0, 5)
    .map((s) => ({
      name: s.name,
      attendance: Number(s.attendance),
    }));

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📊 Attendance Analytics</h1>

      {/* Summary Card */}
      <div style={styles.summaryCard}>
        <p style={styles.summaryLabel}>Total Lectures Conducted</p>
        <h2 style={styles.summaryValue}>{analytics.totalLectures}</h2>
      </div>

      <div style={styles.grid}>
        {/* Student Attendance */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Student Attendance %</h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={studentAttendance}>
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1e40af" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="attendance"
                fill="url(#blueGrad)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Defaulters */}
        <div style={styles.card}>
          <h2 style={{ ...styles.cardTitle, color: "#dc2626" }}>
            🚨 Top Defaulters (&lt; 75%)
          </h2>

          {topDefaulters.length === 0 ? (
            <div style={styles.noDefaulter}>
              🎉 All students are above 75%
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={topDefaulters}>
                <defs>
                  <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f87171" />
                    <stop offset="100%" stopColor="#b91c1c" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="attendance"
                  fill="url(#redGrad)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default AttendanceAnalytics;

/* ===================== STYLES ===================== */

const styles = {
  container: {
    minHeight: "100vh",
    padding: "50px",
    background: "#f1f5f9",
    fontFamily: "Segoe UI, sans-serif",
  },

  center: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },

  title: {
    textAlign: "center",
    fontSize: "34px",
    fontWeight: "700",
    marginBottom: "40px",
    color: "#0f172a",
  },

  summaryCard: {
    width: "280px",
    margin: "0 auto 50px",
    padding: "25px",
    background: "#ffffff",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
  },

  summaryLabel: {
    color: "#64748b",
    fontSize: "14px",
  },

  summaryValue: {
    fontSize: "42px",
    marginTop: "8px",
    color: "#2563eb",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
    gap: "40px",
  },

  card: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
  },

  cardTitle: {
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#1e293b",
  },

  noDefaulter: {
    textAlign: "center",
    padding: "60px 0",
    fontSize: "18px",
    color: "#16a34a",
    fontWeight: "600",
  },
};
