import { useEffect, useState } from "react";

import api from "../../api/api"; // ✅ interceptor-based axios instance

function AttendanceReports() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/api/attendance/reports") // ✅ use api
      .then((res) => setReports(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load attendance reports");
      });
  }, []);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>📋 Attendance Reports</h1>

      <div style={styles.card}>
        {error && <p style={styles.empty}>❌ {error}</p>}

        {!error && reports.length === 0 && (
          <p style={styles.empty}>No attendance data available</p>
        )}

        {reports.length > 0 && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Student Name</th>
                <th style={styles.th}>Attendance %</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((student) => (
                <tr key={student.studentId} style={styles.row}>
                  <td style={styles.td}>{student.name}</td>
                  <td style={styles.td}>
                    {Number(student.attendancePercentage).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AttendanceReports;

/* ======================= STYLES ======================= */

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background: "#f1f5f9",
  },

  title: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "30px",
  },

  card: {
    width: "80%",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    padding: "14px",
    background: "#1e293b",
    color: "#e5e7eb",
    fontSize: "15px",
    textAlign: "left",
  },

  td: {
    padding: "14px",
    borderBottom: "1px solid #e2e8f0",
    fontSize: "15px",
    color: "#334155",
  },

  row: {
    transition: "background 0.2s ease",
  },

  empty: {
    padding: "20px",
    textAlign: "center",
    color: "#64748b",
  },
};
