import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import api from "../../api/api";

function AttendanceHistory() {
  const [lectures, setLectures] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  // ================= SAFE STUDENT FETCH =================
  const storedStudent = localStorage.getItem("student");
  const student = storedStudent ? JSON.parse(storedStudent) : null;
  const rollNo = student?.rollNo || "";

  // Prevent blank crash if not logged in
  if (!rollNo) {
    return (
      <div style={{ padding: "40px", color: "white" }}>
        Please login again.
      </div>
    );
  }

  // ================= LOAD LECTURES =================
  useEffect(() => {
    api
      .get(`/api/attendance/lectures/student/${rollNo}`)
      .then((res) => setLectures(res.data))
      .catch((err) => console.error(err));
  }, [rollNo]);

  // ================= LOAD ATTENDANCE =================
  useEffect(() => {
    if (selectedLecture) {
      api
        .get(`/api/attendance/student/${rollNo}/lecture/${selectedLecture}`)
        .then((res) => setAttendance(res.data))
        .catch((err) => console.error(err));
    }
  }, [selectedLecture, rollNo]);

  // ================= FILTER BY MONTH =================
  const monthlyAttendance = selectedMonth
    ? attendance.filter((a) => {
        if (!a.markedAt) return false;

        const date = new Date(a.markedAt);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const formattedMonth = `${year}-${month}`;

        return formattedMonth === selectedMonth;
      })
    : attendance;

  // ================= CALCULATION =================
  const totalClasses = monthlyAttendance.length;

  const presentCount = monthlyAttendance.filter(
    (a) => a.status === "PRESENT"
  ).length;

  const percentage =
    totalClasses === 0
      ? 0
      : ((presentCount / totalClasses) * 100).toFixed(2);

  // ================= DOWNLOAD PDF =================
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Attendance History", 14, 15);

    doc.setFontSize(11);
    doc.text(`Roll No: ${rollNo}`, 14, 25);
    doc.text(`Lecture ID: ${selectedLecture}`, 14, 32);
    doc.text(`Month: ${selectedMonth || "All"}`, 14, 39);
    doc.text(`Attendance: ${percentage}%`, 14, 46);

    const tableColumn = ["Date", "Status"];
    const tableRows = [];

    monthlyAttendance.forEach((a) => {
      tableRows.push([
        new Date(a.markedAt).toLocaleDateString(),
        a.status,
      ]);
    });

    autoTable(doc, {
      startY: 55,
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("attendance-history.pdf");
  };

  return (
    <div style={pageStyle}>
      <h2>📅 Attendance History</h2>

      {/* SELECT LECTURE */}
      <select
        style={selectStyle}
        value={selectedLecture}
        onChange={(e) => {
          setSelectedLecture(e.target.value);
          setSelectedMonth(""); // reset month
        }}
      >
        <option value="">Select Lecture</option>
        {lectures.map((l) => (
          <option key={l.lectureId} value={l.lectureId}>
            {l.title}
          </option>
        ))}
      </select>

      {/* SELECT MONTH */}
      {selectedLecture && (
        <input
          type="month"
          style={selectStyle}
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      )}

      {/* SUMMARY */}
      {selectedLecture && (
        <div style={summaryCard}>
          <p>Total Classes: <b>{totalClasses}</b></p>
          <p>Present: <b>{presentCount}</b></p>
          <p>
            Percentage:{" "}
            <b style={{ color: "#22c55e" }}>{percentage}%</b>
          </p>
        </div>
      )}

      {/* PROGRESS BAR */}
      {selectedLecture && (
        <div style={chartCard}>
          <p style={{ fontWeight: "600" }}>Monthly Attendance</p>
          <div style={barBg}>
            <div style={{ ...barFill, width: `${percentage}%` }}>
              {percentage}%
            </div>
          </div>
        </div>
      )}

      {/* PDF BUTTON */}
      {monthlyAttendance.length > 0 && (
        <button style={pdfBtn} onClick={downloadPDF}>
          📄 Download PDF
        </button>
      )}

      {/* TABLE */}
      {selectedLecture && (
        <div style={tableWrapper}>
          {monthlyAttendance.length === 0 ? (
            <p style={{ padding: "20px" }}>
              No attendance records found.
            </p>
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {monthlyAttendance.map((a) => (
                  <tr key={a.id}>
                    <td style={tdStyle}>
                      {new Date(a.markedAt).toLocaleDateString()}
                    </td>
                    <td
                      style={{
                        ...tdStyle,
                        fontWeight: "600",
                        color:
                          a.status === "PRESENT"
                            ? "#22c55e"
                            : "#ef4444",
                      }}
                    >
                      {a.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const pageStyle = {
  minHeight: "100vh",
  padding: "40px",
  background: "linear-gradient(135deg, #020617, #0f172a)",
  color: "#fff",
};

const selectStyle = {
  padding: "10px",
  marginTop: "15px",
  borderRadius: "8px",
  width: "250px",
};

const summaryCard = {
  marginTop: "20px",
  padding: "20px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.08)",
  width: "280px",
};

const chartCard = {
  marginTop: "20px",
  padding: "16px",
  width: "280px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.08)",
};

const barBg = {
  width: "100%",
  height: "26px",
  background: "rgba(255,255,255,0.2)",
  borderRadius: "20px",
};

const barFill = {
  height: "100%",
  background: "#22c55e",
  textAlign: "center",
  lineHeight: "26px",
  fontWeight: "600",
};

const tableWrapper = {
  marginTop: "30px",
  borderRadius: "16px",
  overflow: "hidden",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  padding: "14px",
  background: "rgba(255,255,255,0.1)",
};

const tdStyle = {
  padding: "14px",
  textAlign: "center",
};

const pdfBtn = {
  marginTop: "15px",
  padding: "12px 20px",
  borderRadius: "10px",
  border: "none",
  background: "#22c55e",
  color: "#000",
  fontWeight: "600",
  cursor: "pointer",
};

export default AttendanceHistory;
